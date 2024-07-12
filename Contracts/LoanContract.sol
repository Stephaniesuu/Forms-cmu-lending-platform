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

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        createTime = block.timestamp;
        deadline = createTime + _loanDuration * 1 days;     // Calculate the deadline by adding the duration(in days) to the creation time
    }

    // Modifier: check if the msg.sender is the buyer, seller or the owner of the factory
    modifier onlyOwner() {
        require(msg.sender == contractOwner || msg.sender == buyer || msg.sender == seller, "Only the owner can call this function");
        _;
    }

    // Get the collateral amount
    function getCollateralAmount() public view onlyOwner() returns (uint256) {
        return collateralAmount;
    }

    // Get the loan amount
    function getLoanAmount() public view onlyOwner() returns (uint256) {
        return loanAmount;
    }

    // Get the deadline
    function getDeadline() public view onlyOwner() returns (uint256) {
        return deadline;
    }

}
