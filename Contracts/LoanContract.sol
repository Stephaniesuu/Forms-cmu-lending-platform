// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./CollateralCoin.sol";

contract LoanContract {
    address private buyer;              // The one who borrows the loan
    address private seller;             // The one who lends the loan
    address private contractOwner;      // The owner of the factory contract, possibiliy CMU

    uint256 private collateralAmount;   // The amount of collateral coins deposited
    uint256 private loanAmount;         // The amount of loan coins
    
    uint256 public createTime;          // The creation time of this contract
    uint256 public deadline;            // Buyers should repay the loan before this time
    
    uint256 public arrayIndex;          // The index of the arrays in the factory contract, i.e. Contracts[i]

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration, uint256 _arrayIndex) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        createTime = block.timestamp;
        deadline = createTime + _loanDuration * 1 days;     // Calculate the deadline by adding the duration(in days) to the creation time
        arrayIndex = _arrayIndex;
    }

    // Modifier: check if the msg.sender is the owner of the contract factory
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Only the owner of the factory contract can call this function");
        _;
    }

    // Modifier: check if the msg.sender is the one of the participants in the contract
    //           i.e. buyer, seller, or the owner of the factory contract
    modifier onlyParticipants() {
        require(msg.sender == contractOwner || msg.sender == buyer || msg.sender == seller, "Only the participants of the contract can call this function");
        _;
    }

    // Get the collateral amount
    // Can only be called by participants
    function getCollateralAmount() public view onlyParticipants() returns (uint256) {
        return collateralAmount;
    }

    // Get the loan amount
    // Can only be called by participants
    function getLoanAmount() public view onlyParticipants() returns (uint256) {
        return loanAmount;
    }

    // Get the deadline of the loan contract
    // Can only be called by participants
    function getDeadline() public view onlyParticipants() returns (uint256) {
        return deadline;
    }

}
