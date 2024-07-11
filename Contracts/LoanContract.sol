// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./CollateralCoin.sol";

contract LoanContract {
    address private buyer;
    address private seller;
    address private contractOwner;

    uint256 private collateralAmount;
    uint256 private loanAmount;
    
    uint256 public createTime;
    uint256 public loanDuration;

    // Constructor: fill in the variables passed by the ContractFactory
    constructor(address _buyer, address _seller, address _contractOwner, uint256 _collateralAmount, uint256 _loanAmount, uint256 _loanDuration) {
        buyer = _buyer;
        seller = _seller;
        contractOwner = _contractOwner;
        collateralAmount = _collateralAmount;
        loanAmount = _loanAmount;
        createTime = block.timestamp;
        loanDuration = _loanDuration;
    }

    // Modifier: check if the msg.sender is the buyer, seller or the owner of the factory
    modifier onlyOwner() {
        require(msg.sender == contractOwner || msg.sender == buyer || msg.sender == seller, "Only the owner can call this function");
        _;
    }



}
