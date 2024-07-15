// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoanContractFactory is Ownable {
    LoanContract[] private Contracts;
    uint256 private totalContracts;
    mapping(uint256 => address) private indexToContractAddress;

    // Set the owner of the factory contract = msg.sender and do some initalizations
    constructor() Ownable(msg.sender) {
        totalContracts = 0;
    }

    // Create a new loan contract
    function createLoanContract(
        address buyer,
        address seller,
        uint colleteralAmount,
        uint loanAmount,
        uint loanDuration
    ) public onlyOwner {
        LoanContract newContract = new LoanContract(
            buyer,
            seller,
            owner(),
            colleteralAmount,
            loanAmount,
            loanDuration,
            totalContracts
        );
        Contracts.push(newContract);
        indexToContractAddress[totalContracts] = address(newContract);
        totalContracts++;
    }

    // Get the whole contract and return to the backend/ frontend, maybe in .json format
    // Can only be called by the factory owner
    function getContract(
        uint index
    ) public view onlyOwner returns (LoanContract) {
        require(index >= 0 && index < totalContracts, "Index out of range");
        return Contracts[index];
    }
}
