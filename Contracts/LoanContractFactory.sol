// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";

contract LoanContractFactory is Ownable {
    LoanContract[] private Contracts;
    uint256 private totalContracts;

    mapping(uint256 => address) private indexToContractAddress;
    mapping(address => uint256) private contractAddressToIndex;

    // 2 mappings to store the contract addresses of each buyer and seller
    // so that a user can view all the contracts they participated as a buyer/ seller separately
    mapping(address => uint256[]) private buyerToContractAddresses;
    mapping(address => uint256[]) private sellerToContractAddresses;

    // Set the owner of the factory contract = msg.sender and do some initalizations
    constructor() Ownable(msg.sender) {
        totalContracts = 0;
    }

    // Create a new loan contract, and return its address
    function createLoanContract (
        address buyer,
        address seller,
        uint256 colleteralAmount,
        uint256 loanAmount,
        uint256 loanDuration,
        address collateralCoinAddress,
        address loanCoinAddress
    ) external onlyOwner returns (address) {
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

        // Push the address to both buyer and seller
        buyerToContractAddresses[buyer].push(totalContracts);
        sellerToContractAddresses[seller].push(totalContracts);

        return address(newContract);
    }

    function getAddressWithIndex(uint256 index) external view onlyOwner returns (address) {
        return indexToContractAddress[index];
    }

    // Return all the contract for a specific address as a buyer
    function getAddressAsBuyer(address buyer) external view returns (address[]) {
        require(msg.sender == buyer, "You can only view your contracts");
        return buyerToContractAddresses[buyer];
    }

    // Return all the contract for a specfiic address as a seller
    function getAddressAsSeller(address seller) external view returns (address[]) {
        require(msg.sender == seller, "You can only view your contracts");
        return sellerToContractAddresses[seller];
    }

    /*********************************************
    The following codes are usable but may not be necessary
    *********************************************/

    /*

    // Contract owner can get the whole contract and return to the backend/ frontend, maybe in .json format
    function getContract(uint256 index) external view onlyOwner returns (LoanContract) {
        require(index < totalContracts, "Index out of range");
        return Contracts[index];
    }

    function getIndexWithAddress(address contractAddress) external view onlyOwner returns (uint256) {
        return contractAddressToIndex[contractAddress];
    }



    */
}
