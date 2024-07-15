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

    
    // Get the whole contract and return to the backend/ frontend, maybe in .json format
    // Can only be called by the factory owner
    function getContract(uint index) public view onlyOwner() returns (LoanContract) {
        require (index >= 0 && index < totalContracts, "Index out of range");
        return Contracts[index];
    }
    
}