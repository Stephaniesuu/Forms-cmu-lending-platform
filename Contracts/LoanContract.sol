// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./CollateralCoin.sol";
import "./LoanCoin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoanContract is Ownable {

    address private buyer;              // The one who borrows the loan
    address private seller;             // The one who lends the loan
    address private contractOwner;      // The owner of the factory contract, possibiliy CMU

    uint256 private collateralAmount;   // The amount of collateral coins deposited
    uint256 private loanAmount;         // The amount of loan coins
    
    uint256 public createTime;          // The creation time of this contract
    uint256 public deadline;            // Buyers should repay the loan before this time
    
    uint256 public arrayIndex;          // The index of the arrays in the factory contract, i.e. Contracts[i]

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration, uint256 _arrayIndex)
    Ownable(_contractOwner) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        createTime = block.timestamp;
        deadline = createTime + _loanDuration * 1 days;     // Calculate the deadline by adding the duration(in days) to the creation time
        arrayIndex = _arrayIndex;
    }

    // Modifier: check if the msg.sender is the buyer
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only the buyer can call this function");
        _;
    }

    // Modifier: check if the msg.sener is the seller
    modifier onlySeller() {
        require(msg.sender == seller, "Only the seller can call this function");
        _;
    }

    // Get the collateral amount
    function getCollateralAmount() public view onlyOwner() onlyBuyer() onlySeller() returns (uint256) {
        return collateralAmount;
    }

    // Get the loan amount
    function getLoanAmount() public view onlyOwner() onlyBuyer() onlySeller() returns (uint256) {
        return loanAmount;
    }

    // Get the deadline of the loan contract
    function getDeadline() public view onlyOwner() onlyBuyer() onlySeller() returns (uint256) {
        return deadline;
    }

    // Borrower taking out the loan
    function withdraw(uint256 amount) public onlyBuyer(){
        // to be done
    }

    // Borrower repaying the loan
    function repay(uint256 amount) public onlyBuyer() {
        // to be done
    }

    function lock() public onlySeller() {
        // to be done
    }
}
