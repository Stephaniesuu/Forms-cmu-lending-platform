// SPDX-License-Identifier: None
pragma solidity ^0.8.0;
import "./LoanContract.sol";

contract LoanContractFactory is Ownable {
    LoanContract[] private Contracts;
    uint256 private totalContracts;

    mapping(uint256 => address) private indexToContractAddress;
    mapping(address => uint256) private contractAddressToIndex;

    mapping(address => uint256[]) private buyerToIndex;
    mapping(address => uint256[]) private sellerToIndex;

    // Set the owner of the factory contract = msg.sender and do some initalizations
    constructor() Ownable(msg.sender) {
        // totalContracts = 0;
    }

    // Create a new loan contract, and return its address
    function createLoanContract (
        address buyer,
        address seller,
        uint256 colleteralAmount,
        uint256 loanAmount,
        uint256 deadline,
        address collateralCoinAddress,
        address loanCoinAddress
    ) external onlyOwner returns (address) {
        LoanContract newContract = new LoanContract (
            buyer,
            seller,
            owner(),
            colleteralAmount,
            loanAmount,
            deadline,
            totalContracts,
            collateralCoinAddress,
            loanCoinAddress
        );
        
        // Push the contract into Contracts[]
        Contracts.push(newContract);
        
        // Store the index-address pair
        indexToContractAddress[totalContracts] = address(newContract);
        contractAddressToIndex[address(newContract)] = totalContracts;

        // Push the index to the buyer and seller's array, so that they can get all their contracts index as a buyer/ seller,
        // and check the address by the index
        buyerToIndex[buyer].push(totalContracts);
        sellerToIndex[seller].push(totalContracts);


        totalContracts++;
        return address(newContract);
    }

    function getAddressWithIndex(uint256 index) external view onlyOwner returns (address) {
        return indexToContractAddress[index];
    }

    function getTotalContractsByBuyer(address buyer) external view onlyOwner returns (uint256[] memory) {
        return buyerToIndex[buyer].length;
    }
    
    function getTotalContractsBySeller(address seller) external view onlyOwner returns (uint256[] memory) {
        return sellerToIndex[seller].length;
    }

    function getAddressByBuyerIndex(address buyer, uint256 index) external view onlyOwner returns (address) {
        return indexToContractAddress[buyerToIndex[buyer][index]];
    }

    function getAddressBySellerIndex(address seller, uint256 index) external view onlyOwner returns (address) {
        return indexToContractAddress[sellerToIndex[seller][index]];
    }

    /*********************************************
    The following codes are usable but may not be necessary
    *********************************************/


    // Contract owner can get the whole contract and return to the backend/ frontend, maybe in .json format
    // function getContract(uint256 index) external view onlyOwner returns (LoanContract) {
    //     require(index < totalContracts, "Index out of range");
    //     return Contracts[index];
    // }

    // function getIndexWithAddress(address contractAddress) external view onlyOwner returns (uint256) {
    //     return contractAddressToIndex[contractAddress];
    // }


    /*********************************************
    The following codes are not usable. Getting the contracts by the user may need to be implmented in frontend/ backend
    *********************************************/

    // // 2 mappings to store the contract addresses of each buyer and seller
    // // so that a user can view all the contracts they participated as a buyer/ seller separately
    // mapping(address => uint256[]) private buyerToIndex;
    // mapping(address => uint256[]) private sellerToIndex;

    // Return all the contract for a specific address as a buyer
    // function getAddressAsBuyer(address buyer) external view returns (uint256[] memory) {
    //     require(msg.sender == buyer, "You can only view your contracts");
    //     return buyerToIndex[buyer];
    // }

    // // Return all the contract for a specfiic address as a seller
    // function getAddressAsSeller(address seller) external view returns (address[] memory) {
    //     require(msg.sender == seller, "You can only view your contracts");
    //     return sellerToIndex[seller];
    // }

}
