const fs = require('fs');

const coinArray = [
    { name: 'Bitcoin', shortForm: 'BTC', value: 502103.25 },
    { name: 'Ethereum', shortForm: 'ETH', value: 24603.69},
    { name: 'PAK Coin', shortForm: 'PAK', value: 10000.00 },
    { name: 'Hei Coin', shortForm: 'HEI', value: 8888.88 },
    { name: 'Jorey Coin', shortForm: 'JORE', value: 777.77 },
    { name: 'Stephanie Coin', shortForm: 'STEP', value: 666.66 },
    { name: 'Forms Coin', shortForm: 'FRMS', value: 1.00 },
];

const metamask = [
    '0xC4962c5ffD42B3f5B346B367D320bC83221BFe5a',
    '0x98995a5F534278074AC44bc6ea857ACE39768b',
    '0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3',
    '0x88E43897C7bF54320085372f375CE0c833B603BA',
    '0xFE5579F671408a5B87F5AEf515263f57aac47373',
    '0x4A549B0344a6c8d80360EddE72047b82e8F98b2D',
];

const statuses = ['Active', 'Matured', 'Pending', 'Pairing'];
const loanDurations = [3, 6, 9, 12, 15, 18, 21, 24];

function generateRandomBuyer() {
    return metamask[Math.floor(Math.random() * metamask.length)];
}

function generateRandomSeller(buyer) {
    let seller;
    do {
        seller = metamask[Math.floor(Math.random() * metamask.length)];
    } while (seller === buyer);
    return seller;
}

function generateRandomAsset() {
    return coinArray[Math.floor(Math.random() * coinArray.length)];
}

function generateRandomAssetAmount() {
    return parseFloat((Math.random() * 10).toFixed(5));
}

function generateRandomRepaymentAmount(assetAmount) {
    return parseFloat((assetAmount * 1.14).toFixed(5));
}

function generateRandomCollateral(asset) {
    let collateral;
    do {
        collateral = coinArray[Math.floor(Math.random() * coinArray.length)];
    } while (collateral.shortForm === asset.shortForm);
    return collateral;
}

function generateRandomCollateralAmount(collateral, originalCollateralValue) {
    return parseFloat((originalCollateralValue / collateral.value).toFixed(5));
}

function generateRandomCreateDate() {
    const start = new Date('2024-01-01');
    const end = new Date('2024-08-01');
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
}

function generateRandomDeadline(createDate, loanDuration) {
    const deadline = new Date(new Date(createDate).setMonth(new Date(createDate).getMonth() + loanDuration));
    return deadline.toISOString().split('T')[0];
}

function generateStatusBasedOnDates(createDate, deadline) {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    const createDateObj = new Date(createDate);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    if (currentDate > deadlineDate) {
        return 'Matured';
    } else if (createDateObj <= oneMonthAgo) {
        return 'Pending';
    } else {
        return Math.random() < 0.5 ? 'Active' : 'Matured';
    }
}

function generateRandomLoanDuration() {
    return loanDurations[Math.floor(Math.random() * loanDurations.length)];
}

function generateRandomAddress() {
    return '0x' + Math.random().toString(16).substring(2, 42).padEnd(40, '0');
}

function generateContract() {
    const buyer = generateRandomBuyer();
    const seller = generateRandomSeller(buyer);
    const asset = generateRandomAsset();
    let assetAmount;
    let assetValue;

    // Ensure assetValue is at least 1000 HKD
    do {
        assetAmount = generateRandomAssetAmount();
        assetValue = assetAmount * asset.value;
    } while (assetValue < 1000);
    assetValue = assetValue.toFixed(5);
    const repaymentAmount = generateRandomRepaymentAmount(assetAmount);
    const repayment = asset.shortForm;
    const repayValue = repaymentAmount * asset.value;
    const collateral = generateRandomCollateral(asset);
    const originalCollateralValue = (repayValue * 1.2).toFixed(5);
    const collateralAmount = generateRandomCollateralAmount(collateral, originalCollateralValue);
    const createDate = generateRandomCreateDate();
    const loanDuration = generateRandomLoanDuration();
    const deadline = generateRandomDeadline(createDate, loanDuration);
    const status = generateStatusBasedOnDates(createDate, deadline);

    return {
        address: generateRandomAddress(),
        buyer,
        seller,
        asset: asset.shortForm,
        assetAmount,
        assetValue,
        repayment,
        repaymentAmount,
        collateral: collateral.shortForm,
        collateralAmount,
        originalCollateralValue,
        margin: 10,
        loanDuration,
        status,
        createDate,
        deadline
    };
}

for (let i = 0; i < 5; i++) {
    const contract = generateContract();
    const contractString = JSON.stringify(contract, null, 2) + ',\n';

    fs.appendFile('contracts.js', contractString, (err) => {
        if (err) throw err;
        console.log(`Contract ${i + 1} has been appended to contracts.js!`);
    });
}