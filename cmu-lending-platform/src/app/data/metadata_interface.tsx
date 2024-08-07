export interface Contract {
    address: string; // contract address, "NULL" if not created yet
    buyer: string;  // buyer address, e.g.: 0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3
    seller: string; // seller address, e.g.: 0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3

    asset: string;  // Coins, e.g.: Bitcoin, Ethereum
    assetAmount: number; // Amount of coins, e.g.: 0.1
    assetValue: number; // The value of the asset

    repayment: string;  // Coins
    repaymentAmount: number; // Amount of Coins
    repayValue: number; // The value of the repayment

    collateral: string; // Coins, e.g.: Bitcoin, Ethereum
    collateralAmount: number; // Amount of coins, e.g.: 0.1
    originalCollateralValue: number; // Price when the collateral is locked (in HKD)
    margin: number; // Percentage, e.g.: 10 = 10%, which means the price cannot drop over 10%

    interest: number; // Percentage, e.g.: 10 = 10%
    loanDuration: number; // In Months, e.g.: 12 = 12 Months
    status: string; // Active, Matured, Pending, Pairing

    createDate: string; // Date, e.g.: 2021-09-01
    deadline: string; // Date, e.g.: 2021-09-01
};

export type RecordDataType = {
    address: string; // contract address, "NULL" if not created yet
    buyer: string;  // buyer address, e.g.: 0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3
    seller: string; // seller address, e.g.: 0xdfbDA87Fe51EA50E2B5cbd6d253b6A58A6F295E3

    asset: string;  // Coins, e.g.: Bitcoin, Ethereum
    assetAmount: number; // Amount of coins, e.g.: 0.1
    assetValue: number; // The value of the asset

    repayment: string;  // Coins
    repaymentAmount: number; // Amount of Coins
    repayValue: number; // The value of the repayment

    collateral: string; // Coins, e.g.: Bitcoin, Ethereum
    collateralAmount: number; // Amount of coins, e.g.: 0.1
    originalCollateralValue: number; // Price when the collateral is locked (in HKD)
    margin: number; // Percentage, e.g.: 10 = 10%, which means the price cannot drop over 10%

    interest: number; // Percentage, e.g.: 10 = 10%
    loanDuration: number; // In Months, e.g.: 12 = 12 Months
    status: string; // Active, Matured, Pending, Pairing

    createDate: string; // Date, e.g.: 2021-09-01
    deadline: string; // Date, e.g.: 2021-09-01
};

// export interface marketTable {
//     // key: React.Key;
//     assest: string,
//     creditor: string,
//     amount: number,
//     amountValue: string,
//     repayment: number,
//     repaymentValue: string,
//     requiredCollateral: string,
//     duration: string,
//     createDate: string,
// };
// export interface dashboardTable {
//     // key: React.Key;
//     assest: string,
//     counterparty: string,
//     amount: number,
//     value: string,
//     status: string,
//     deadline: string,
// }