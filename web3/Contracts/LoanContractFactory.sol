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
        // totalContracts = 0;
    }

    // Create a new loan contract, and return its address
    function createLoanContract (
        address buyer,
        address seller,
        uint256 colleteralAmount,
        uint256 loanAmount,
        uint256 loanDurationInDays,
        uint256 totalRepaymentAmount,
        uint256 marginValue,
        address collateralCoinAddress,
        address loanCoinAddress
    ) external onlyOwner returns (address) {
        LoanContract newContract = new LoanContract (
            buyer, // buyer
            seller, // seller
            owner(), // _contractOwner
            colleteralAmount,   // collateralAmount
            loanAmount, // totalLoanAmount
            loanDurationInDays, // loan duration
            totalRepaymentAmount, // totalRepaymentAmount, should be calculated by ethers.js
            marginValue, // marginValue, the exact value, not percentage
            totalContracts, // array index
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

        // The below is NOT NEEDED, as we currently stored contract, buyer and seller's address in the contract
        // buyerToIndex[buyer].push(totalContracts);
        // sellerToIndex[seller].push(totalContracts);

        totalContracts++;
        return address(newContract);
    }

    function getAddressWithIndex(uint256 index) external view onlyOwner returns (address) {
        return indexToContractAddress[index];
    }

    // function getAddressByBuyerIndex(address buyer, uint256 index) external view onlyOwner returns (address) {
    //     return indexToContractAddress[buyerToIndex[buyer][index]];
    // }

    // function getAddressBySellerIndex(address seller, uint256 index) external view onlyOwner returns (address) {
    //     return indexToContractAddress[sellerToIndex[seller][index]];
    // }


    // The below is NOT NEEDED, as we currently stored contract, buyer and seller's address in the contract
    // mapping(address => uint256[]) private buyerToIndex;
    // mapping(address => uint256[]) private sellerToIndex;

    // function getTotalContractsByBuyer(address buyer) external view onlyOwner returns (uint256) {
    //     return buyerToIndex[buyer].length;
    // }
    
    // function getTotalContractsBySeller(address seller) external view onlyOwner returns (uint256) {
    //     return sellerToIndex[seller].length;
    // }
}
