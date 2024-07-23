import { ethers } from "ethers";
import 'dotenv/config';
import  fs from "fs";

const createContract = async (
    contractFactory,
    buyer,
    seller,
    collateralAmount,
    loanAmount,
    loanDuration,
    collateralCoinAddress,
    loanCoinAddress
) => {
    await contractFactory.createLoanContract(
        buyer,
        seller,
        collateralAmount,
        loanAmount,
        loanDuration,
        collateralCoinAddress,
        loanCoinAddress
    );
};

const getContractAddress = async(contractFactory, index) => {
    contractFactory.getContractAddress(index);
}

const sellerRepay = async(contract, amount) => {
    return await contract.sellerRepay(amount);
}

const contract_abi = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).abi;
const contract_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).bytecode;

const main = async () => {
    // read data from .env
    const provider_url = process.env.provider_url;
    const provider_ID = process.env.provider_ID;
    const signer = process.env.signer;

    // reading abi& bytecode from file
    const factory_abi = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).abi;
    const factory_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).bytecode;

    const provider = new ethers.JsonRpcProvider(`${provider_url}${provider_ID}`);

    // create the factory
    contractFactory = new ethers.ContractFactory(factory_abi, factory_bytecode, signer);

}
main()