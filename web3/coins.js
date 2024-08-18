import {ethers} from "ethers";
import 'dotenv/config';
import fs from "fs";

const provider_url = process.env.provider_url;
const provider_ID = process.env.provider_ID;

const provider = new ethers.providers.JsonRpcProvider(`${provider_url}${provider_ID}`);

const coin_abi = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).abi;
const coin_bytecode = JSON.parse(fs.readFileSync("./abi/_FormsCoin.json")).bytecode;
const coinFactory = new ethers.ContractFactory(coin_abi, coin_bytecode, signer);

const deployCoin = async() => {
    // Already deployed...
    return;
    const coins = [];
    const _names = [
        "Pak Coin",
        "Hei Coin",
        "Jorey Coin",
        "Stephanie Coin",
        "Coin Alan",
        "Forms Coin",
    ]
    const _symbols = [
        "PAK",
        "HEI",
        "JORY",
        "STEP",
        "ALAN",
        "FRMS",
    ]

    console.log('deploying coins...');
    for (let i = 0; i < _names.length; i++) {
        console.log(`loop: ${i}`);
        const coin = await coinFactory.deploy(_names[i], _symbols[i], {
            gasLimit: 3000000
        });
        await coin.deployed();
        coins.push(coin);
        console.log(`Coin ${_names[i]} deployed successfully, address: ${coin.address}`);
    }
    console.log('Coins deployed successfully');
}

export const approveContract = async(contractAddress, spenderAddress, amount) => {
    const contract = new ethers.Contract(contractAddress, coin_abi, signer);
    const tx = await contract.approve(spenderAddress, amount);
    await tx.wait();
    console.log(`Contract ${contractAddress} approved for user ${spenderAddress} successfully`);
}

