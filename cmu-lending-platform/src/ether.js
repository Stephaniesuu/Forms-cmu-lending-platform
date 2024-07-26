// // 1.Import the compiled contract abi of which you are going to deploy or interact with
// // 2.Configure the JsonRpcProvider whom you will broadcast the transaction to
// // 3.Import private key that will be used to sign transactions (wallet)
// // 4.Construct the raw transaction body
// // 5.Sign the transaction
// // 6.Broadcast the transaction
// // 7.Transaction receipt and contract event listening

// import { ethers } from "ethers";


// // 1. Import the compiled contract abi

// // 2. providor
// // choose the network you want to deploy to from 'https://chainlist.org/'
// const ALCHEMY_MAINNET_URL = 'https://rpc.ankr.com/eth';
// const ALCHEMY_SEPOLIA_URL = 'https://rpc.sepolia.org';

// const providorETH = new ethers.JsonRpcProvider(ALCHEMY_MAINNET_URL);
// const providorSEPOLIA = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL);

// // 3. Import private key
// const privateKey = '' //read from wallet
// const wallet = new ethers.Wallet(privateKey, providorSEPOLIA);


