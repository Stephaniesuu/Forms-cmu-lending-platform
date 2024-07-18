// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./CollateralCoin.sol";
import "./LoanCoin.sol";

contract LoanContract is Ownable {
    address private buyer;  // The one who borrows the loan, i.e. buy collateral using loan coins
    address private seller; // The one who lends the loan, i.e. sell collateral for loan coins
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
    uint256 public marginValue = currentCollateralValue * (100 - margin) / 100; // Liquidation happens at that value (for testing) 
    uint8[] public dummyPriceDrops = [85, 90, 95, 100, 105, 110, 115]; // Dummy prices drop/rise percentage (for testing)

    // events

    event contractDeployed(
        address indexed _contractAddress,
        uint256 time
    ); // Triggered when a new contract is deployed

    event deposit(
        address indexed _from, 
        uint256 indexed _collateralCoinAmount, 
        uint256 indexed _loanCoinAmount,
        uint256 _time
    ); // Triggered when someone deposit coins into the contract, i.e. seller deposits collateral and buyer deposits loan
    
    event withdrawal(
        address indexed _to,
        uint256 indexed _collateralCoinAmount,
        uint256 indexed _loanCoinAmount,
        uint256 _time
    ); // Triggered when someone withdraw coins from the contract

    event repayment(
        address indexed _from,
        uint256 indexed _amount,
        uint256 indexed _time
    ); // Triggered when the buyer repays the loan
    
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

        emit contractDeployed(address(this), block.timestamp);
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

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can call this function");
    }

    function getBuyer() public view returns (address) {
        return buyer;
    }

    function getSeller() public view returns (address) {
        return seller;
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

    // Seller can check the available loan amount
    function checkAvailableLoanAmount() public view onlySeller() returns (uint256) {
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

    // Seller taking out the loan deposited by the buyer
    function sellerWithdraw(uint256 amount) external onlySeller returns (uint256) {
        require(
            CollateralCoin.balanceOf(address(this)) == collateralAmount,
            "You must lock enough collateral before withdrawing"
        );

        // Check if the seller is borrowing more than the availableLoanAmount, if so, cap the amount
        if (amount > availableLoanAmount) {
            amount = availableLoanAmount;
        }

        LoanCoin.transfer(seller, amount);
        availableLoanAmount -= amount;
        
        emit withdrawal(seller, 0, amount, block.timestamp);

        return amount;
    }
    
    // seller repaying the loan
    function sellerRepay(uint256 amount) external onlySeller returns (uint256) {
        // Check if the seller is repaying more than he needs, if so, cap the amount
        if (amount > totalRepaymentAmount - repaidAmount) {
            amount = totalRepaymentAmount - repaidAmount;
        }

        // The repaid coins will go into the buyer's address directly, without transferring to the contract as a medium
        LoanCoin.transferFrom(msg.sender, buyer, amount);
        repaidAmount += amount;

        emit repayment(msg.sender, amount, block.timestamp);

        // Check if the seller finished repaying, if so, transfer all collateral back to the seller
        if (repaidAmount == totalRepaymentAmount) {
            CollateralCoin.transfer(seller, collateralAmount);
            emit withdrawal(seller, collateralAmount, 0, block.timestamp);
        }
        
        return amount;
    }

    // Seller deposit and lock the collateral, seller must lock the exact required amount of collateral in once
    function sellerLockCollateral() external onlySeller returns (bool) {
        require(
            CollateralCoin.balanceOf(msg.sender) >= collateralAmount,
            "Not enough collateral"
        );
        require(
            CollateralCoin.balanceOf(address(this)) < collateralAmount,
            "Collateral was already locked previously"
        );
        CollateralCoin.transferFrom(
            msg.sender,
            address(this),
            collateralAmount
        );

        emit deposit(msg.sender, collateralAmount, 0, block.timestamp);

        return true;
    }

    // Buyer deposit and lock the loan coins, buyer must also lock the exact required amount of loan coins in once
    function buyerLockLoan() external onlyBuyer returns (bool) {
        require(
            LoanCoin.balanceOf(msg.sender) >= totalLoanAmount,
            "Not enough loan coins"
        );
        require(
            LoanCoin.balanceOf(address(this)) < totalLoanAmount,
            "Loan coins already locked"
        );
        LoanCoin.transferFrom(msg.sender, address(this), totalLoanAmount);

        emit deposit(msg.sender, 0, totalLoanAmount, block.timestamp);

        return true;
    }

    // Liquidation: all collaterals and loan coins remaining are transferred to the buyer
    function liquidation() external onlyBuyer() onlyContractOwner() returns (bool) {
        // liquidation happens only when the loan is overdue or the requirements of margin call is met
        require(
            overdue() || dropExceedsMargin(), 
            "Loan is not overdue or does not meet the requirement of margin call."
        );
        
        require(
            repaidAmount < totalRepaymentAmount, 
            "Loan already repaid."
        );

        CollateralCoin.transfer(buyer, collateralAmount);
        LoanCoin.transfer(buyer, availableLoanAmount);

        emit withdrawal(buyer, collateralAmount, availableLoanAmount, block.timestamp);

        availableLoanAmount = 0; // No more loan is available
        return true;
    }

    /********************************************************************
        The code below are used for testing the margin call mechanism.
     ********************************************************************/

    function dropExceedsMargin() public view returns (bool) {
        return currentCollateralValue <= marginValue;
    }

    function overdue() public view returns (bool) {
        return block.timestamp > deadline;
    }

    // testing function for adjusting the collateral value, will return the new value
    function dummyPriceAdjuster() external returns (uint256){
        // random from 0 to 6
        uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp))) % 7;
        currentCollateralValue = currentCollateralValue * dummyPriceDrops[random] / 100;
        
        return currentCollateralValue;
    }

    // testing function for setting the collateral value
    function setDummyValue(uint256 value) external {
        currentCollateralValue = value;
    }
}
