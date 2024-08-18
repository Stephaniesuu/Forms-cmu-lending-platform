import {ethers} from "ethers";
import 'dotenv/config';

import { _coinABI } from "../abi/_FormsCoin.js";
import { _contractABI } from "../abi/LoanContract.js";

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const providerUrl = `https://sepolia.infura.io/v3/${infuraProjectId}`;
// const provider = new ethers.providers.JsonRpcProvider(`${providerUrl}`);

const contract_abi = _contractABI.abi;
const coin_abi = _coinABI.abi;

const gasLimit = 3000000;

export const sellerLockCollateral = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);
    
    const successful = await contract.sellerLockCollateral({ gasLimit : gasLimit });
    await successful.wait();
    if (successful) 
        return `Successfully locked collateral`;
    return `Failed to lock collateral`;
}

export const buyerLockLoan = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);
    const successful = await contract.buyerLockLoan({ gasLimit: gasLimit});
    await successful.wait();
    if (successful)
        return `Successfully locked loan`;
    return `Failed to lock loan`;
}

export const withdrawLoan = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);

    const result = await contract.sellerWithdraw();
    await result.wait();
    const remaining = await contract.getAvailableLoanAmount({ gasLimit: gasLimit });
    await remaining.wait();
    return `Successfully withdrew loan: ${result}, Remaining: ${remaining}`;
}

export const repayLoan = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);

    const result = await contract.sellerRepay({ gasLimit: gasLimit });
    await result.wait();
    return `Successfully repaid loan: ${result}\n${getRepaymentDetails(contract)}`;
}

export const liquidation = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);

    const successful = await contract.liquidation(9999999999, {gasLimit: gasLimit});
    await successful.wait();
    if (successful)
        return `Successfully liquidated, all assets have been transferred to the buyer`;
    return `Failed to liquidate`;
}

export const getRepaymentDetails = async(address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()
    const contract = new ethers.Contract(address, contract_abi, signer);
    
    const totalRepaymentAmount = await contract.getTotalRepaymentAmount();
    const repaidAmount = await contract.getRepaidAmount();
    const remaining = totalRepaymentAmount - repaidAmount;
    return `Total repayment needed: ${totalRepaymentAmount}, Repaid: ${repaidAmount}, Remaining: ${remaining}`;
}

export const getStatus = async(ContractAddress, Asset, Collateral)  => {
    const contract = new ethers.Contract(address, contract_abi, provider);
    const asset = new ethers.Contract(Asset, coin_abi, provider);
    const collateral = new ethers.Contract(Collateral, coin_abi, provider);

    const assetBalance = await asset.balanceOf(ContractAddress);
    const collateralBalance = await collateral.balanceOf(ContractAddress);
    
    const collateralAmount = await contract.getCollateralAmount();

    if (assetBalance == 0 || collateralBalance == 0) return 'Pending';
    if (collateralAmount == 0) return 'Matured';
    return 'Active';
};

export const functions = {
    sellerLockCollateral,
    buyerLockLoan,
    withdrawLoan,
    repayLoan,
    liquidation,
    getRepaymentDetails,
    getStatus
};