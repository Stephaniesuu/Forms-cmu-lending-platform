require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const provider = new ethers.InfuraProvider('goerli', process.env.INFURA_PROJECT_ID);
const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

const deployContract = async (contractName) => {
  const contractJson = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'artifacts', `${contractName}.json`), 'utf8'));
  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.evm.bytecode.object, wallet);
  const contract = await factory.deploy();
  await contract.deployed();
  console.log(`${contractName} deployed to:`, contract.address);
  return contract;
};

const main = async () => {
  console.log("Deploying contracts with the account:", wallet.address);

  const balance = await wallet.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), 'ETH');

  await deployContract('LoanContract');
  await deployContract('LoanContractFactory');
  await deployContract('FormsCoin');
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
