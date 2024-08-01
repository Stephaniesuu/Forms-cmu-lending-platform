export interface marketTable {
  key: React.Key;
  assest: string,
  creditor: string,
  amount: number,
  amountValue: string,
  repayment: number,
  repaymentValue: string,
  requiredCollateral: string,
  duration: string,
  createDate: string,
}

export interface dashboardTable {
  key: React.Key;
  assest: string,
  counterparty: string,
  amount: number,
  value: string,
  status: string,
  deadline: string,
}

