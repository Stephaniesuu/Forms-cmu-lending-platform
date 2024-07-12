// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";

contract LoanContractFactory {
    address private owner;
    LoanContract[] public Contracts;
    uint256 private totalContracts;

    // Set the owner of the factory contract = msg.sender and do some initalizations
    constructor() {
        owner = msg.sender;
        totalContracts = 0;
    }

    // Modifier: check if the msg.sender is the owner of the factory contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner of the factory contract can call this function");
        _;
    }
    
    // Create a new loan contract
    // Can only be called by the factory owner
    function createLoanContract(address buyer, address seller, uint colleteralAmount, uint loanAmount, uint loanDuration) public onlyOwner() {
        LoanContract newContract = new LoanContract(buyer, seller, owner, colleteralAmount, loanAmount, loanDuration, totalContracts);
        Contracts.push(newContract);
        totalContracts++;
    }
    
    // Get the whole contract and return to the backend/ frontend, maybe in .json format
    // Can only be called by the factory owner
    function getContract(uint index) public view onlyOwner() returns (LoanContract) {
        require (index >= 0 && index < totalContracts, "Index out of range");
        return Contracts[index];
    }
}