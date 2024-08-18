// const { ethers } = require('ethers');
import { ethers } from 'ethers';
// import '../node_modules/dotenv/config.js';
// // require('dotenv').config();
import fs from 'fs';
import 'dotenv/config'

const infuraUrl = 'https://sepolia.infura.io/v3/';

const infuraProjectId = process.env.provider_ID;
// console.log("id is:"+infuraProjectId);
const providerUrl = `${infuraUrl}${infuraProjectId}`;
// initial Ethers.js 
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

const signer_private_key = process.env.DEPLOYER_PRIVATE_KEY;
const signer = new ethers.Wallet(signer_private_key, provider);
// const signer = new ethers.Wallet(signer_private_key, provider);

const factoryAddress = '0x4F21D0E7fc8CF31e7B011D912a5Dcb5Fc234e776';
const contractJSON = JSON.parse(fs.readFileSync("../abi/LoanContract.json"));
const FromscontractJSON = JSON.parse(fs.readFileSync("../abi/FormsContract.json"));
const contractFactoryJSON = JSON.parse(fs.readFileSync("../abi/LoanContractFactory.json"));
const factoryABI = contractFactoryJSON.abi;
const contractABI = contractJSON.abi;

// const contractJSON = JSON.parse(fs.readFileSync("../abi/LoanContractFactory.json"));
// const factoryABI = contractJSON.abi;
const contractBytecode = contractJSON.bytecode;
const factory = new ethers.Contract(factoryAddress, factoryABI, signer);

const contractsFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);
// const address = factory.getAddressWithIndex(0);

async function getAddress() {
    try {
        for (let i = 0; i < 9; i++) {
            const address = await factory.getAddressWithIndex(i);
            console.log(address);
        }
    } catch (error) {
        console.error(error);
    }
};
async function fetchContractData() {
    const totalContracts = 9;
    const factory = new ethers.Contract(factoryAddress, factoryABI, signer);

    let contractsData = [];

    for (let i = 0; i < totalContracts; i++) {
        const contractAddress = await factory.getAddressWithIndex(i);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const buyer = await contract.getBuyer();
        const seller = await contract.getSeller();
        const LoanCoinAddress = await contract.getLoanCoinAddress();
        const totalLoanAmount = (await contract.getTotalLoanAmount()).toNumber();
        const totalRepaymentAmount = (await contract.getTotalRepaymenetAmount()).toNumber();
        const collateralCoinAddress = await contract.getCollateralCoinAddress();
        const collateralAmount = (await contract.getCollateralAmount()).toNumber();
        const createTime = new Date((await contract.getCreateTime()).toNumber() * 1000);
        const deadline = new Date((await contract.getDeadline()).toNumber() * 1000);

        contractsData.push({
            buyer,
            seller,
            LoanCoinAddress,
            totalLoanAmount,
            totalRepaymentAmount,
            collateralCoinAddress,
            collateralAmount,
            createTime,
            deadline
        });
    }

    fs.writeFileSync('contractsData.json', JSON.stringify(contractsData, null, 2));
}

//根据获取的地址，得到每个地址下详情信息
async function getinfo() {
    try {
        for (let i = 0; i < 9; i++) {
            const address = await factory.getAddressWithIndex(i);
            const contract = new ethers.Contract(address, contractABI, signer);
            const getBuyer = await contract.getBuyer();
            const getSeller = await contract.getSeller();
            const LoanCoinAddress = await contract.getLoanCoinAddress();
            const collateralCoinAddress = await contract.getCollateralCoinAddress();
            const getAvailableLoanAmount = await contract.getAvailableLoanAmount();
            const getCollateralAmount = await contract.getCollateralAmount();
            // const balance = await contract.balanceOf(signer.address);
            console.log(i);
            console.log(`Contract Address: ${address}`);
            console.log(`Buyer Address: ${getBuyer}`);
            console.log(`Seller Address: ${getSeller}`);
            console.log(`LoancoinAddress Address: ${LoanCoinAddress}`);
            console.log(`collateralCoinAddress Address: ${collateralCoinAddress}`);
            console.log(`AvailableLoanAmount is: ${getAvailableLoanAmount}`);
            console.log(`CollateralAmount is: ${getCollateralAmount}`);
            // console.log(`Balance: ${balance}`);
            console.log(`--------------------------------`);
        }
    } catch (error) {
        console.error(error);
    }
}
async function getinfo1() {
    const gasLimit = 3000000;
const address ='0xD17df38c22D5F69F57479dCCb22879d89708eCff';
const contract = new ethers.Contract(address, contractABI, signer);
const lock = await contract.buyerLockLoan({ gasLimit: gasLimit});
console.log(`${lock}`)
await lock.wait();
    // if (successful) 
    //     return `Successfully locked collateral`;
    // return `Failed to lock collateral`;
}
getinfo();

//仿真调用

// getAddress();
// fetchContractData().catch(console.error);
