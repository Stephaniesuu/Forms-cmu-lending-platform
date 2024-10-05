// const { ethers } = require('ethers');
import { ethers } from 'ethers';
// import '../node_modules/dotenv/config.js';
// // require('dotenv').config();
import 'dotenv/config'
import { _coinABI } from "../abi/_FormsCoin.js";
import { _contractABI } from "../abi/LoanContract.js";
import { factoryContract } from "../abi/LoanContractFactory.js";
import fs from 'fs';

const infuraUrl = 'https://sepolia.infura.io/v3/';

const infuraProjectId = process.env.INFURA_PROJECT_ID;
// console.log("id is:"+infuraProjectId);
const providerUrl = `${infuraUrl}${infuraProjectId}`;
// initial Ethers.js 
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
console.log(providerUrl);
const signer_private_key = process.env.DEPLOYER_PRIVATE_KEY;
const signer = new ethers.Wallet(signer_private_key, provider);

const factoryAddress = '0x4F21D0E7fc8CF31e7B011D912a5Dcb5Fc234e776';
const contractABI = _contractABI.abi;
const contractBytecode = _contractABI.bytecode;

// const coinABI = _coinABI.abi;
const factoryABI = factoryContract.abi;

const totalContracts = 16;

async function fetchContractData() {
    const factory = new ethers.Contract(factoryAddress, factoryABI, signer);

    let contractsData = [];

    for (let i = 0; i < totalContracts; i++) {
        const contractAddress = await factory.getAddressWithIndex(i);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        console.log(contractAddress);

        const buyer = await contract.getBuyer();
        const seller = await contract.getSeller();
        console.log('buyer+seller:', buyer, seller);
        const LoanCoinAddress = await contract.getLoanCoinAddress();
        const totalLoanAmount = (await contract.getTotalLoanAmount()).toNumber();
        const totalRepaymentAmount = (await contract.getTotalRepaymenetAmount()).toNumber();
        const collateralCoinAddress = await contract.getCollateralCoinAddress();
        const collateralAmount = (await contract.getCollateralAmount()).toNumber();
        // const createDate = new Date((await contract.getcreateDate()).toNumber() * 1000);
        const createDate = new Date(1723197840 * 1000);
        const deadline = new Date((await contract.getDeadline()).toNumber() * 1000);

        contractsData.push({
            address: contractAddress,
            buyer: buyer,
            seller: seller,

            asset: LoanCoinAddress,
            assetAmount: totalLoanAmount,
            assetValue: 0,

            repayment: LoanCoinAddress,
            repaymentAmount: totalRepaymentAmount,
            repayValue: 0,

            collateral: collateralCoinAddress,
            collateralAmount: collateralAmount,
            originalCollateralValue: 0,
            margin: 10,

            interest: 5,
            loanDuration: 0,
            status: 'Active',
            
            createDate,
            deadline
        });
    }

    fs.writeFileSync('contractsData.json', JSON.stringify(contractsData, null, 2));
    console.log('Done');
    
}

fetchContractData();