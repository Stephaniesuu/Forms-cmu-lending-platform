import { Tooltip } from "antd";

export function compareValues(a: string, b: string) {
  const parseValue = (value: string) => {
    const number = parseFloat(value.slice(1, -1));
    const unit = value.slice(-1);
    let multiplier = 1;

    if (unit === 'M') {
      multiplier = 1000;
    } else if (unit === 'K') {
      multiplier = 1;
    }

    return number * multiplier;
  };

  const valueA = parseValue(a);
  const valueB = parseValue(b);

  if (valueA > valueB) return 1;
  if (valueA < valueB) return -1;
  return 0;
}

export function compareDates(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  if (d1 < d2) {
    return -1;
  } else if (d1 > d2) {
    return 1;
  } else {
    return 0;
  }
}

export const formatAddress = (address: string): string => {
  return `${address.slice(0, 4)}...${address.slice(-3)}`;
};

export const renderAddress = (value: string) => (
  <Tooltip title={value}>
    <span>{formatAddress(value)}</span>
  </Tooltip>
);

export const coinArray = [
  { name: 'Bitcoin', shortForm: 'BTC', value: 502103.25 },
  { name: 'Ethereum', shortForm: 'ETH', value: 24603.69 },
  { name: 'PAK Coin', shortForm: 'PAK', value: 10000.00 },
  { name: 'Hei Coin', shortForm: 'HEI', value: 8888.88 },
  { name: 'Jorey Coin', shortForm: 'JORE', value: 777.77 },
  { name: 'Stephanie Coin', shortForm: 'STEP', value: 666.66 },
  { name: 'Forms Coin', shortForm: 'FRMS', value: 1.00 },
];

// Function to get the full name of the coin
export const getFullName = (shortForm) => {
  const coin = coinArray.find(c => c.shortForm === shortForm);
  return coin ? coin.name : shortForm;
};

export const renderLoanDuration = (text, record) => {
  return `${record.loanDuration} Months`;
};
