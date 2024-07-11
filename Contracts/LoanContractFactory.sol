// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";

contract LoanContractFactory {
    address private owner;
    LoanContract[] public Contracts;

    // Set the owner of the contract
    constructor() {
        owner = msg.sender;
    }

    // Create a new loan contract
    function createLoanContract(address buyer, address seller, uint colleteralAmount, uint loanAmount, uint loanDuration) public {
        LoanContract newContract = new LoanContract(buyer, seller, owner, colleteralAmount, loanAmount, loanDuration);
        Contracts.push(newContract);
    }

    
}