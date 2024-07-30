import { ethers } from "ethers";
import 'dotenv/config';
import fs from "fs";

// reading data
const provider_url = process.env.provider_url;
const provider_ID = process.env.provider_ID;
const signer = process.env.signer;
const provider = new ethers.providers.JsonRpcProvider(`${provider_url}${provider_ID}`);

const factory_abi = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).abi;
const factory_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).bytecode;
const contract_abi = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).abi;

const coin_abi = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).abi;
const coin_bytecode = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).bytecode;
// Contract factories
const coinFactory = new ethers.ContractFactory(coin_abi, coin_bytecode, factoryOwner);
const factory = new ethers.ContractFactory(factory_abi, factory_bytecode, factoryOwner);

// create a loan contract using LoanContractFactory
const createContract = async(
    factory,
    buyer,
    seller,
    colleteralAmount,
    loanAmount,
    annualInterest,
    loanDurationInDays,
    collateralCoinAddress,
    loanCoinAddress
) => {
    const address = factory.createContract(
        buyer,
        seller,
        colleteralAmount,
        loanAmount,
        loanAmount * (1 + annualInterest / 100) ** (loanDurationInDays / 365),  // Calculate the interest, A = P(1 + r/n)^(nt)
        loanDurationInDays,
        collateralCoinAddress,
        loanCoinAddress
    );
    const contract = new ethers.Contract(address, contract_abi, signer);
    return contract.address;
}

const sellerLockCollateral = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
    const successful = await contract.sellerLockCollateral();
    await successful.wait();
    if (successful) 
        return `Successfully locked collateral`;
    return `Failed to lock collateral`;
}

const buyerLockLoan = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
    const successful = await contract.buyerLockLoan();
    await successful.wait();
    if (successful)
        return `Successfully locked loan`;
    return `Failed to lock loan`;
}

const withdrawLoan = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
    const result = await contract.sellerWithdraw();
    await result.wait();
    const remaining = await contract.getAvailableLoanAmount();
    await remaining.wait();
    return `Successfully withdrew loan: ${result}, Remaining: ${remaining}`;
}

const repayLoan = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
    const result = await contract.sellerRepay();
    await result.wait();
    return `Successfully repaid loan: ${result}\n${getRepaymentDetails(contract)}`;
}

const liquidation = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
    const successful = await contract.liquidation();
    await successful.wait();
    if (successful)
        return `Successfully liquidated, all assets have been transferred to the buyer`;
    return `Failed to liquidate`;
}

const getRepaymentDetails = async(address) => {
    const contract = new ethers.Contract(address, contract_abi, provider);
    const totalRepaymentAmount = await contract.getTotalRepaymentAmount();
    const repaidAmount = await contract.getRepaidAmount();
    const remaining = totalRepaymentAmount - repaidAmount;
    return `Total repayment needed: ${totalRepaymentAmount}, Repaid: ${repaidAmount}, Remaining: ${remaining}`;
}

const main = async () => {
    // const balance = await provider.getBalance(`vitalik.eth`);        // test for the connection to provider
    // console.log(ethers.utils.formatEther(balance));
    
    // Deploy some coins...
    const coins = [];
    const _names = [
        "Pak Coin",
        "Hei Coin",
        "Jorey Coin",
        "Stephanie Coin",
        "Joy Coin",
    ]
    const _symbols = [
        "PAK",
        "HEI",
        "JORY",
        "STEP",
        "JOY9",
    ]

    for (let i = 0; i < _names.length; i++) {
        const coin = await coinFactory.deploy(_names[i], _symbols[i]);
        await coin.deployed();
        coins.push(coin);
    }
    
    // create the contract factory
    const ContractFactory = await factory.deploy();

    const contract = createContract(
        ContractFactory,
        buyer,
        seller,
        collateralAmount,
        loanAmount,
        loanDuration,
        collateralCoinAddress,
        loanCoinAddress
    );
    console.log(`Contract created successfully, address: ${contract.getAddress()}, index: ${contract.getIndex()}`);

    // for testing
    sellerLockCollateral();
    buyerLockLoan();
    withdrawLoan();
    repayLoan();
    liquidation();
    getRepaymentDetails();
    
}
main()