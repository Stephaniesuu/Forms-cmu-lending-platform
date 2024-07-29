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
// const contract_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).bytecode;

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
        // Calculate the interest, A = P(1 + r/n)^(nt)
        loanAmount * (1 + annualInterest / 100) ** (loanDurationInDays / 365),
        loanDurationInDays,
        collateralCoinAddress,
        loanCoinAddress
    );
    const contract = new ethers.Contract(address, contract_abi, signer);
    return contract.address;
}

const sellerLockCollateral = async(address, amount) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
    const successful = await contract.sellerLockCollateral(amount);
    await successful.wait();
    if (successful) 
        return `Successfully locked collateral`;
    return `Failed to lock collateral`;
}

const buyerLockLoan = async(contract, amount) => {
    const successful = await contract.buyerLockLoan(amount);
    await successful.wait();
    if (successful)
        return `Successfully locked loan`;
    return `Failed to lock loan`;
}

const withdrawLoan = async(contract, amount) => {
    const result = await contract.sellerWithdraw(amount);
    await result.wait();
    const remaining = await contract.getAvailableLoanAmount();
    await remaining.wait();
    return `Successfully withdrew loan: ${result}, Remaining: ${remaining}`;
}

const repayLoan = async(contract, amount) => {
    const result = await contract.buyerRepay(amount);
    await result.wait();
    return `Successfully repaid loan: ${result}\n${getRepaymentDetails(contract)}`;
}

const liquidation = async(contract) => {
    const successful = await contract.liquidation();
    await successful.wait();
    if (successful)
        return `Successfully liquidated, all assets have been transferred to the buyer`;
    return `Failed to liquidate`;
}

const getRepaymentDetails = async(contract) => {
    const contract = new ethers.Contract(contract, contract_abi, provider);
    const totalRepaymentAmount = await contract.getTotalRepaymentAmount();
    const repaidAmount = await contract.getRepaidAmount();
    const remaining = totalRepaymentAmount - repaidAmount;
    return `Total repayment needed: ${totalRepaymentAmount}, Repaid: ${repaidAmount}, Remaining: ${remaining}`;
}

const main = async () => {
    // const balance = await provider.getBalance(`vitalik.eth`);        // test for the connection to provider
    // console.log(ethers.utils.formatEther(balance));

    // initalize all variables to 0 for testing
    const buyer = 0;
    const seller = 0;
    const collateralAmount = 0;
    const loanAmount = 0;
    const loanDuration = 0;
    const collateralCoinAddress = 0;
    const loanCoinAddress = 0;
    
    // create the factory
    const factory = new ethers.ContractFactory(factory_abi, factory_bytecode, signer);
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