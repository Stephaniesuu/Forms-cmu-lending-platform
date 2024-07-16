// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./CollateralCoin.sol";
import "./LoanCoin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoanContract is Ownable {
    address private buyer;  // The one who borrows the loan
    address private seller; // The one who lends the loan
    address private contractOwner; // The owner of the factory contract, possibly the CMU

    uint256 private collateralAmount; // The amount of collateral coins deposited
    uint256 private totalLoanAmount; // The amount of loan coins
    uint256 private availableLoanAmount; // The amount of loan coins that were not taken by the borrower yet

    uint256 private totalRepaymentAmount; // How many loan coins are required to repay the loan
    uint256 private repaidAmount; // How many loan coins are paid by the borrower

    uint256 public createTime; // The creation time of this contract
    uint256 public deadline; // Buyers should repay the loan before this time

    uint256 public arrayIndex; // The index of the arrays in the factory contract, i.e. Contracts[i]

    uint256 public margin = 20; // The value of the collateral cannot drop over this margin, else the contract is liquidated

    _CollateralCoin private CollateralCoin;
    _LoanCoin private LoanCoin;

    uint256 public currentCollateralValue = 100; // Dummy value of the collaterals (for testing)
    uint256 public marginValue = currentCollateralValue * (100 - margin) / 100; /* The value of the collateral cannot drop over this margin
                                                                                   else the contract is liquidated (for testing) */
    uint8[] public dummyPriceDrops = [85, 90, 95, 100, 105, 110, 115]; // Dummy prices drop/rise percentage (for testing)

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(
        address _buyer,
        address _seller,
        address _contractOwner,
        uint256 _collateralAmount,
        uint256 _loanAmount,
        uint256 _loanDuration,
        uint256 _arrayIndex,
        address _collateralCoinAddress,
        address _loanCoinAddress
    ) Ownable(_contractOwner) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        totalLoanAmount = _loanAmount;
        availableLoanAmount = totalLoanAmount;
        createTime = block.timestamp;
        deadline = createTime + _loanDuration * 1 days; // Calculate the deadline by adding the duration (in days) to the creation time
        arrayIndex = _arrayIndex;
        CollateralCoin = _CollateralCoin(_collateralCoinAddress);
        LoanCoin = _LoanCoin(_loanCoinAddress);

        totalRepaymentAmount = totalLoanAmount; // The required amount of loan coins to repay the loan, tax calculation is not implemented
    }

    // Modifier: check if the msg.sender is the buyer
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    // Modifier: check if the msg.sender is the seller
    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    // Return the collateral amount
    function getCollateralAmount() public view returns (uint256) {
        return collateralAmount;
    }

    // Return the loan amount
    function getTotalLoanAmount() public view returns (uint256) {
        return totalLoanAmount;
    }

    // Return the deadline of the loan contract
    function getDeadline() public view returns (uint256) {
        return deadline;
    }

    // Return the array index of this contract in the contract factory
    function getArrayIndex() public view returns (uint256) {
        return arrayIndex;
    }

    // Buyer can check the available loan amount
    function checkAvailableLoanAmount() public view onlyBuyer() returns (uint256) {
        return availableLoanAmount;
    }

    // Both buyer and seller can check how many tokens are needed to repay
    function checkTotalRepaymenetAmount() public view onlyBuyer() onlySeller() returns (uint256) {
        return totalRepaymentAmount;
    }

    // Both buyer and seller can check how many tokens are repaid
    function checkRepaidAmount() public view onlyBuyer() onlySeller() returns (uint256) {
        return repaidAmount;
    }

    // Buyer taking out the loan
    function buyerWithdraw(uint256 amount) public onlyBuyer returns (uint256) {
        require(
            CollateralCoin.balanceOf(address(this)) == collateralAmount,
            "Not enough collateral locked, cannot perform this action."
        );

        // Check if the buyer is borrowing more than the availableLoanAmount, if so, cap the amount
        if (amount > availableLoanAmount) {
            amount = availableLoanAmount;
        }

        LoanCoin.transfer(buyer, amount);
        availableLoanAmount -= amount;

        return amount;
    }
    
    // Buyer repaying the loan
    function buyerRepay(uint256 amount) public onlyBuyer returns (uint256) {
        if (amount > totalRepaymentAmount - repaidAmount) {
            // Check if the buyer is repaying too much, if so, cap the amount
            amount = totalRepaymentAmount - repaidAmount;
        }

        // The repaid coins will go into the seller's address directly, without transferring to the contract as a medium
        LoanCoin.transferFrom(msg.sender, seller, amount);
        repaidAmount += amount;

        return amount;
    }

    // Buyer deposit and lock the collateral, buyer must lock the required amount of collateral in once
    function buyerLockCollateral() public onlyBuyer returns (bool) {
        require(
            CollateralCoin.balanceOf(msg.sender) >= collateralAmount,
            "Not enough collateral"
        );
        require(
            CollateralCoin.balanceOf(address(this)) < collateralAmount,
            "Collateral already locked"
        );
        CollateralCoin.transferFrom(
            msg.sender,
            address(this),
            collateralAmount
        );
        return true;
    }

    // Seller deposit and lock the loan coins, seller must lock the required amount of loan coins in once
    function sellerLockLoan() public onlySeller returns (bool) {
        require(
            LoanCoin.balanceOf(msg.sender) >= totalLoanAmount,
            "Not enough loan coins"
        );
        require(
            LoanCoin.balanceOf(address(this)) < totalLoanAmount,
            "Loan coins already locked"
        );
        LoanCoin.transferFrom(msg.sender, address(this), totalLoanAmount);

        return true;
    }

    // If the loan is overdue, all collaterals and loan coins remaining are transferred to the seller
    function overdueLiquidation() public returns (bool) {
        require(block.timestamp > deadline, "Loan not overdue");
        require(repaidAmount < totalRepaymentAmount, "Loan already repaid");
        CollateralCoin.transferFrom(
            address(this), 
            seller, 
            collateralAmount
        );
        LoanCoin.transferFrom(
            address(this), 
            seller, 
            availableLoanAmount
        );
        availableLoanAmount = 0;
        return true;
    }

    /********************************************************************
        The code below are used for testing the margin call mechanism.
     ********************************************************************/

    function dropExceedsMargin() public view returns (bool) {
        // return true if the collateral price drop is exceeding the margin
        if (currentCollateralValue <= marginValue) {
            return true;
        }
        // else return false
        return false;
    }

    function marginCall() public onlySeller returns (bool) {
        require(dropExceedsMargin(), "Collateral value is not dropping below the margin");
        CollateralCoin.transferFrom(
            address(this),
            msg.sender,
            collateralAmount
        );
        LoanCoin.transferFrom(
            address(this),
            msg.sender,
            availableLoanAmount
        );
        availableLoanAmount = 0;
        return true;
    }

    // testing function for adjusting the collateral value, will return the new value
    function dummyPriceAdjuster() public returns (uint256){
        // random from 0 to 6
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp))) % 7;
        currentCollateralValue = currentCollateralValue * dummyPriceDrops[random] / 100;
        
        return currentCollateralValue;
    }

    // testing function for setting the collateral value
    function setDummyValue(uint256 value) public {
        currentCollateralValue = value;
        marginValue = currentCollateralValue * (100 - margin) / 100;
    }
}
