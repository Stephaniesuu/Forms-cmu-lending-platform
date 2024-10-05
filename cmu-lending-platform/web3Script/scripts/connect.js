// const { ethers } = require('ethers');
import {ethers} from 'ethers';
// import '../node_modules/dotenv/config.js';
// // require('dotenv').config();
import fs from 'fs';
// // import '../dotenv/config';
import 'dotenv/config'


const infuraProjectId = process.env.INFURA_PROJECT_ID;
// console.log("id is:"+infuraProjectId);
const mantleTestnetUrl = `https://sepolia.infura.io/v3/${infuraProjectId}`;

// initial Ethers.js 
const provider = new ethers.providers.JsonRpcProvider(mantleTestnetUrl);

// provider.getBalance(address).then((balance) => {
//   console.log(balance);
// });
// const coin_abi = JSON.parse(fs.readFileSync("../abi/_FormsCoin.json")).abi;
// 定义代币合约地址和ABI
const tokenAddress = '0x3DD8e3eb70a2603a35DeeCD6E3214A0B048C3211';
const tokenABI = JSON.parse(fs.readFileSync("../abi/_FormsCoin.json")).abi;

// 创建合约实例
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, provider);

// 定义要查询余额的地址
const address = '0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3';

// 调用balanceOf函数获取余额
async function getBalance() {
  const balance = await tokenContract.balanceOf(address);
  console.log(`Balance: ${ethers.utils.formatEther(balance)} tokens`);
}

async function getContractAddress() {
  const contractAddress = await tokenContract.getAddress();
  console.log(`Contract Address: ${contractAddress}`);
}

// 执行函数
// getContractAddress();
getBalance();
console.log(`--------------------------------`);
// provider.getBlockNumber()
//   .then((latestBlock) => {
//     console.log(`successful!!! New block is : ${latestBlock}`);

//     // new block data 
//     return provider.getBlock(latestBlock);
//   })
//   .then((block) => {
//     console.log('New Block Data:', block);

//     // special block data 
//     const blockNumber = 12345;
//     return provider.getBlock(blockNumber);
//   })
//   .then((blockData) => {
//     console.log(`Block 12345 Data:`, blockData);

//     // account balance 
//     const accountAddress = '0x87807C9a722bC7d545fBb77CA540B23dA66E18BE';
//     return provider.getBalance(accountAddress);
//   })
//   .then((balance,accountAddress) => {
//     console.log(`Account value: ${ethers.utils.formatEther(balance)} ETH`);
//   })
//   .catch((error) => {
//     console.error('error:', error);
//   });
