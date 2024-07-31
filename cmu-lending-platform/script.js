import { ethers } from "ethers";
import 'dotenv/config';
import fs from "fs";

// reading data
const provider_url = process.env.provider_url;
const provider_ID = process.env.provider_ID;
<<<<<<< HEAD
const factoryOwner = process.env.factoryOwner;
=======
const signer = process.env.signer;
>>>>>>> main
const provider = new ethers.providers.JsonRpcProvider(`${provider_url}${provider_ID}`);

const factory_abi = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).abi;
const factory_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContractFactory.json")).bytecode;
const contract_abi = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).abi;
<<<<<<< HEAD
// const contract_bytecode = JSON.parse(fs.readFileSync("./abi/LoanContract.json")).bytecode;
const coin_abi = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).abi;
const coin_bytecode = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).bytecode;

=======

const coin_abi = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).abi;
const coin_bytecode = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).bytecode;
>>>>>>> main
// Contract factories
const coinFactory = new ethers.ContractFactory(coin_abi, coin_bytecode, factoryOwner);
const factory = new ethers.ContractFactory(factory_abi, factory_bytecode, factoryOwner);

// create a loan contract using LoanContractFactory
const createContract = async(
<<<<<<< HEAD
    buyer,
    seller,
    factoryOwner,
    colleteralAmount,
    loanAmount,
    loanDuration,
=======
    factory,
    buyer,
    seller,
    colleteralAmount,
    loanAmount,
    annualInterest,
    loanDurationInDays,
>>>>>>> main
    collateralCoinAddress,
    loanCoinAddress
) => {
    const address = factory.createContract(
        buyer,
        seller,
        colleteralAmount,
        loanAmount,
<<<<<<< HEAD
        loanDuration,
        collateralCoinAddress,
        loanCoinAddress
    );
    const contract = new ethers.Contract(address, contract_abi, factoryOwner);
    return contract.address;
}

// Let the seller to interact with the contract and lock their collateral
const sellerLockCollateral = async(address, signer) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
    const successful = await contract.sellerLockCollateral();
    await successful.wait();
    if (successful) 
        return `Successfully locked collateral.\nContract address: ${contract.address}`;
    return `Failed to lock collateral.\nContract address: ${contract.address}`;
}

// Let the seller to interact with the contract and withdraw their loan
const withdrawLoan = async(address, amount, signer) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
    const result = await contract.sellerWithdraw(amount);
    await result.wait();
    const remaining = await contract.getAvailableLoanAmount();
    await remaining.wait();
    return `Successfully withdrew loan: ${result}, Remaining: ${remaining}.\nContract address: ${contract.address}`;
}

// Let the seller to interact with the contract and repay their loan
const repayLoan = async(address, amount, signer) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
    const result = await contract.buyerRepay(amount);
=======
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
>>>>>>> main
    await result.wait();
    return `Successfully repaid loan: ${result}\n${getRepaymentDetails(contract)}`;
}

<<<<<<< HEAD
// Let the buyer to interact with the contract and lock their loan
const buyerLockLoan = async(address, signer) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
    const successful = await contract.buyerLockLoan();
    await successful.wait();
    if (successful)
        return `Successfully locked loan.\nContract address: ${contract.address}`;
    return `Failed to lock loan.\nContract address: ${contract.address}`;
}

// Transfer all the assest to the seller's wallet
const liquidation = async(address, signer) => {
    const contract = new ethers.Contract(address, contract_abi, signer);
=======
const liquidation = async(address, sender) => {
    const contract = new ethers.Contract(address, contract_abi, sender);
>>>>>>> main
    const successful = await contract.liquidation();
    await successful.wait();
    if (successful)
        return `Successfully liquidated, all assets have been transferred to the buyer`;
    return `Failed to liquidate`;
}

<<<<<<< HEAD
// Return the details of the repayment, i.e. how many repayment is needed
const getRepaymentDetails = async(address) => {
    const contract = new ethers.Contract(contract, contract_abi, provider);
    const totalRepaymentAmount = await contract.getTotalRepaymentAmount();
    const repaidAmount = await contract.getRepaidAmount();
    const remaining = totalRepaymentAmount - repaidAmount;
    return `Total repayment needed: ${totalRepaymentAmount}, Repaid: ${repaidAmount}, Remaining: ${remaining}\nContract address: ${contract.address}`;
}

// Return the contract details in .json format for UI/UX design
const getContractDetails = async(address) => {
    const contract = new ethers.Contract(address, contract_abi, provider);
    const buyer = await contract.getBuyer();
    const seller = await contract.getSeller();
    const collateralAmount = await contract.getCollateralAmount();
    const loanAmount = await contract.getLoanAmount();
    const deadline = await contract.getDeadline();
    const collateralCoinAddress = await contract.getCollateralCoinAddress();
    const loanCoinAddress = await contract.getLoanCoinAddress();

    // return the data in .json format
    return JSON.stringify({
        buyer: buyer,
        seller: seller,
        collateralAmount: collateralAmount,
        loanAmount: loanAmount,
        deadline: deadline,
        collateralCoinAddress: collateralCoinAddress,
        loanCoinAddress: loanCoinAddress,
    })
}

// Deploy ERC20
const depolyCoin = async (_name, _symbol) => {
    const coin = await coinFactory.deploy(_name, _symbol);
    return coin.address;
}

const eventListener = async(address) => {
    const contract = new ethers.Contract(address, contract_abi, provider);

    contract.on("contractDeployed", (address, time) => {
        console.log(`Contract deployed at ${address} at ${time}`);
    })

    contract.on("deposit", (from, collateralAmount, loanCoinAmount, time) => {
        console.log(
            `Deposited:
            From: ${from},
            Collateral Amount: ${collateralAmount},
            Loan Coin Amount: ${loanCoinAmount},
            Time: ${time}`
        );
    })

    contract.on("withdrawal", (to, collateralAmount, loanAmount, time) => {
        console.log(
            `Withdrawal:
            To: ${to},
            Collateral Amount: ${collateralAmount},
            Loan Amount: ${loanAmount},
            Time: ${time}`
        )
    })

    contract.on("repayment", (from, amount, time) => {
        console.log(
            `Repayment:
            From: ${from},
            Amount: ${amount},
            Time: ${time}`
        )
    }
}

const main = async () => {
    // deploy some coins...
    const _names = [
        "Pak Coin",
        "Hei Coin",
        "Forms Coin",
        "Jorey Coin",
        "Stephanie Coin",
        "Hong Kong Coin",
        "Chicken Coin",
        "Duck Coin",
        "Bird Coin",
        "Pig Coin", 
        "Dog Coin",
        "Cat Coin",
    ]

    const _symbols = [
        "PAK",
        "HEI",
        "FRM",
        "JRY",
        "STP",
        "HKC",
        "CCK",
        "DCK",
        "BIR",
        "PIG",
        "DOG",
        "CAT",
    ]

    let coins = [];
    for (let index in _names) {
        coins.push(await depolyCoin(_names[index], _symbols[index]));
        console.log(`Coin: ${_names[index]}(${_symbols[index]}) deployed to ${coins[index]}`);
    }

    // deploy Contract Factory
    const ContractFactory = await factory.deploy();
    await ContractFactory.deployed();
    console.log(`Contract Factory deployed to ${ContractFactory.address}`);  
=======
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
    
>>>>>>> main
}
main()