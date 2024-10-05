// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
// import "./CollateralCoin.sol";
// import "./LoanCoin.sol";
import "./FormsCoin.sol";

contract LoanContract is Ownable {
    address private buyer;  // The one who borrows the loan, i.e. buy collateral using loan coins
    address private seller; // The one who lends the loan, i.e. sell collateral for loan coins
    address private contractOwner; // The owner of the factory contract, possibly the CMU

    uint256 private collateralAmount; // The amount of collateral coins deposited
    uint256 private totalLoanAmount; // The amount of loan coins
    uint256 private availableLoanAmount; // The amount of loan coins that were not taken by the borrower yet

    uint256 private totalRepaymentAmount; // How many loan coins are required to repay the loan
    uint256 private repaidAmount; // How many loan coins are paid by the borrower

    uint256 public createDate; // The creation time of this contract
    uint256 public loanDurationInDays; // The duration of the loan in days
    uint256 public deadline; // Buyers should repay the loan before this time

    uint256 public arrayIndex; // The index of the arrays in the factory contract, i.e. Contracts[i]
    uint256 public marginValue;

    _FormsCoin private CollateralCoin;
    _FormsCoin private LoanCoin;

    uint256 public currentCollateralValue = 100; // Collateral value rise/drop percentage (100% at first)

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
        uint256 _repaymentAmount,
        uint256 _marginValue,
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
        createDate = block.timestamp;
        loanDurationInDays = _loanDuration;
        deadline = createDate + _loanDuration * 1 days ; // Calculate the deadline by adding the duration (in days) to the creation time
        arrayIndex = _arrayIndex;
        CollateralCoin = _FormsCoin(_collateralCoinAddress);
        LoanCoin = _FormsCoin(_loanCoinAddress);
        marginValue = _marginValue;

        totalRepaymentAmount = _repaymentAmount; // Calculated from script.js

        emit contractDeployed(address(this), block.timestamp);
    }

    // ***** Modifiers *****
    // Check if the msg.sender is the buyer
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    // Check if the msg.sender is the seller
    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    // Check if the msg.sender is the contract owner
    modifier onlyContractOwner() {
        require(msg.sender == contractOwner, "Only the contract owner can call this function");
        _;
    }

    // ***** Get methods *****

    function getBuyer() external view returns (address) {
        return buyer;   // buyer's address
    }

    function getSeller() external view returns (address) {
        return seller;  // seller's address
    }

    // Return the collateral
    function getCollateralCoinAddress() external view returns (address) {
        return address(CollateralCoin);
    }

    function getCollateralAmount() external view returns (uint256) {
        return collateralAmount;
    }

    // Return the loan amount
    function getLoanCoinAddress() external view returns (address) {
        return address(LoanCoin);
    }

    function getTotalLoanAmount() external view returns (uint256) {
        return totalLoanAmount;
    }

    function getAvailableLoanAmount() external view returns (uint256) {
        return availableLoanAmount;
    }

    function getTotalRepaymenetAmount() external view returns (uint256) {
        return totalRepaymentAmount;
    }

    function getRepaidAmount() external view returns (uint256) {
        return repaidAmount;
    }

    function getcreateDate() external view returns (uint256) {
        return createDate;
    }

    // Return the deadline of the loan contract
    function getDeadline() external view returns (uint256) {
        return deadline;
    }

    // Return the array index of this contract in the contract factory
    function getArrayIndex() external view returns (uint256) {
        return arrayIndex;
    }

    // Seller deposit and lock the collateral, seller must lock the exact required amount of collateral in once
    function sellerLockCollateral() external onlySeller returns (bool) {
        // If the contract is matured, collateralAmount = 0 as a flag, so loan coins should not be locked again
        require(
            collateralAmount > 0,
            "Contract matured"
        );

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
        // If the contract is matured, collateralAmount = 0 as a flag, so loan coins should not be locked again
        require(
            collateralAmount > 0,
            "Contract matured"
        );
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

    // Seller taking out the loan deposited by the buyer
    function sellerWithdraw() external onlySeller returns (uint256) {
        require(
            CollateralCoin.balanceOf(address(this)) == collateralAmount,
            "You must lock enough collateral before withdrawing"
        );

        require(
            availableLoanAmount > 0,
            "No loan available"
        );
        
        LoanCoin.transfer(seller, availableLoanAmount);
        availableLoanAmount = 0;
        
        emit withdrawal(seller, 0, availableLoanAmount, block.timestamp);

        return availableLoanAmount;
    }
    
    // seller repaying the loan, must return all the repayment at once
    function sellerRepay() external onlySeller returns (uint256) {
        require(
            collateralAmount > 0,
            "Contract matured"
        );
        
        require(
            LoanCoin.balanceOf(msg.sender) >= totalRepaymentAmount,
            "Balance not enough"
        );

        require(
            availableLoanAmount == 0,
            "You didn't take out the loan yet."
        );

        // The repaid coins will go into the buyer's address directly, without transferring to the contract as a medium
        LoanCoin.transferFrom(msg.sender, buyer, totalRepaymentAmount);
        repaidAmount += totalRepaymentAmount;

        emit repayment(msg.sender, repaidAmount, block.timestamp);

        // Transfer all the collateral back to the seller
        CollateralCoin.transfer(seller, collateralAmount);
        emit withdrawal(seller, collateralAmount, 0, block.timestamp);
        
        collateralAmount = 0; // Contract matured
        return repaidAmount;
    }

    // Liquidation: all collaterals and loan coins remaining are transferred to the buyer
    function liquidation(uint256 currentValue) external returns (bool) {
        // liquidation happens only when the loan is overdue or the requirements of margin call is met
        require(
            overdue() || dropExceedsMargin(currentValue), 
            "Loan is not overdue or does not meet the requirement of margin call."
        );
        
        require(
            repaidAmount < totalRepaymentAmount, 
            "Loan already repaid."
        );

        CollateralCoin.transfer(buyer, collateralAmount);
        LoanCoin.transfer(buyer, availableLoanAmount);

        emit withdrawal(buyer, collateralAmount, availableLoanAmount, block.timestamp);

        availableLoanAmount = 0; // No more loan will be available
        collateralAmount = 0; // Contract matured
        return true;
    }

    function dropExceedsMargin(uint256 currentValue) public view returns (bool) {
        return currentValue <= marginValue;
    }

    function overdue() public view returns (bool) {
        return block.timestamp > deadline;
    }


    /********************************************************************
        The code below are used for testing the margin call mechanism.
     ********************************************************************/


    // testing function for adjusting the collateral value, will return the new value
    // function dummyPriceAdjuster() external returns (uint256){
    //     // random from 0 to 6
    //     uint256 random = uint256(keccak256(abi.encodePacked(block.timestamp))) % 7;
    //     currentCollateralValue = currentCollateralValue * dummyPriceDrops[random] / 100;
        
    //     return currentCollateralValue;
    // }

    // // testing function for setting the collateral value
    // function setDummyValue(uint256 value) external {
    //     currentCollateralValue = value;
    // }
}
