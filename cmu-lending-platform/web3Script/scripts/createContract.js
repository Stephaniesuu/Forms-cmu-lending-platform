import {ethers} from "ethers";
import 'dotenv/config';
import fs from "fs";
// reading data
// const provider_url = process.env.provider_url;
// const provider_ID = process.env.provider_ID;

// const provider = new ethers.providers.JsonRpcProvider(`${provider_url}${provider_ID}`);
// const factory_abi = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.sol/LoanContractFactory.json")).abi;
// const factory_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.sol/LoanContractFactory.json")).bytecode;
// const contract_abi = JSON.parse(fs.readFileSync("./abi/LoanContract.sol/LoanContract.json")).abi;

// // const metamask = new ethers.providers.Web3Provider(window.ethereum);
// // await metamask.send("eth_requestAccounts", []);
// // const signer = metamask.getSigner();
// // const signer = process.env.signer;

// const privateKey = process.env.PRIVATE_KEY; // 从环境变量中读取私钥
// const signer = new ethers.Wallet(privateKey, provider);

// const factory = new ethers.ContractFactory(factory_abi, factory_bytecode, signer);

// create a loan contract using LoanContractFactory
const createContract = async(
    factory,
    buyer,
    seller,
    colleteralAmount,
    loanAmount,
    loanDurationInDays,
    annualInterest,     // i.e. 5%
    collateralValue,    // Initial collateral value, i.e. 1000 (equals HKD$1000)
    marginPercentage,   // The price drop of collateral cannot exceed this range, i.e. 10%, if the price of collateral drops by 10%, the contract will be terminated
    collateralCoinAddress,
    loanCoinAddress
) => {
    const address = factory.createContract(
        buyer,
        seller,
        colleteralAmount,
        loanAmount,
        loanDurationInDays,
        loanAmount * (1 + annualInterest / 100) ** (loanDurationInDays / 365),  // Calculate the interest, A = P(1 + r/n)^(nt)
        collateralValue * (100 - marginPercentage) / 100,
        collateralCoinAddress,
        loanCoinAddress
    );
    const contract = new ethers.Contract(address, contract_abi, signer);
    return contract.address;
}


// create a prompt to ask users to input the above data and give hints about the data type and format
const main = () => {
    const buyer = prompt("Enter the buyer's address: ");
    const seller = prompt("Enter the seller's address: ");
    const colleteralAmount = prompt("Enter the collateral amount: ");
    const loanAmount = prompt("Enter the loan amount: ");
    const loanDurationInDays = prompt("Enter the loan duration in days: ");
    const annualInterest = prompt("Enter the annual interest rate: ");
    const collateralValue = prompt("Enter the collateral value: ");
    const marginPercentage = prompt("Enter the margin percentage: ");
    const collateralCoinAddress = prompt("Enter the collateral coin address: ");
    const loanCoinAddress = prompt("Enter the loan coin address: ");

    // const contract = await createContract(
    //     factory,
    //     buyer,
    //     seller,
    //     colleteralAmount,
    //     loanAmount,
    //     loanDurationInDays,
    //     annualInterest,
    //     collateralValue,
    //     marginPercentage,
    //     collateralCoinAddress,
    //     loanCoinAddress
    // );
    // print all the data again for testing
    console.log("Buyer: ", buyer);
    console.log("Seller: ", seller);
    console.log("Collateral Amount: ", colleteralAmount);
    console.log("Loan Amount: ", loanAmount);
    console.log("Loan Duration in Days: ", loanDurationInDays);
    console.log("Annual Interest: ", annualInterest);
    console.log("Collateral Value: ", collateralValue);
    console.log("Margin Percentage: ", marginPercentage);
    console.log("Collateral Coin Address: ", collateralCoinAddress);
    console.log("Loan Coin Address: ", loanCoinAddress);
    // console.log("Contract Address: ", contract);
}
main()