// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";

contract LoanContractFactory is Ownable {
    LoanContract[] private Contracts;
    uint256 private totalContracts;

    mapping(uint256 => address) private indexToContractAddress;
    mapping(address => uint256) private contractAddressToIndex;

    // Set the owner of the factory contract = msg.sender and do some initalizations
    constructor() Ownable(msg.sender) {
        totalContracts = 0;
    }

    // Create a new loan contract
    function createLoanContract(
        address buyer,
        address seller,
        uint256 colleteralAmount,
        uint256 loanAmount,
        uint256 loanDuration,
        address collateralCoinAddress,
        address loanCoinAddress
    ) public onlyOwner {
        LoanContract newContract = new LoanContract (
            buyer,
            seller,
            owner(),
            colleteralAmount,
            loanAmount,
            loanDuration,
            totalContracts,
            collateralCoinAddress,
            loanCoinAddress
        );
        Contracts.push(newContract);
        indexToContractAddress[totalContracts] = address(newContract);
        contractAddressToIndex[address(newContract)] = totalContracts;
        totalContracts++;
    }

    /*********************************************
    The following codes are usable but may not be necessary
    *********************************************/

    /*



    // Contract only can get the whole contract and return to the backend/ frontend, maybe in .json format
    function getContract(uint256 index) public view onlyOwner returns (LoanContract) {
        require(index < totalContracts, "Index out of range");
        return Contracts[index];
    }

    function getAddressWithIndex(uint256 index) public view onlyOwner returns (address) {
        return indexToContractAddress[index];
    }

    function getIndexWithAddress(address contractAddress) public view onlyOwner returns (uint256) {
        return contractAddressToIndex[contractAddress];
    }



    */
}
