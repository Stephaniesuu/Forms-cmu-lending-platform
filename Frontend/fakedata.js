import fs from "fs";

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

class coin {
    constructor(name, symbol) {
        this.name = name;
        this.symbol = symbol;
    }
}

const coins = []

for (let index in _names) {
    coins.push(new coin(_names[index], _symbols[index]));
}

const fakeCoin = () => {
    for (let index in coins) {
        console.log(JSON.stringify(coins[index]))
        fs.appendFile('data.json', `${JSON.stringify(coins[index])}\n`, (err) => {
            if (err) throw err;
        })
    }
}
