import { Tooltip } from "antd";
import { coinArray } from '../../data/coinsPrice';
import { BitcoinCircleColorful, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import { PlbtColorful,MonaCircleColorful, DoboCircleColorful,BoneCircleColorful,ShibCircleColorful,PntCircleColorful,YooshiCircleColorful } from '@ant-design/web3-icons';
export const renderCoin = (asset: string) => {
  const assetIconMap: { [key: string]: React.ReactNode } = {
    'BTC': <BitcoinCircleColorful style={{ fontSize: 20 }} />,
    'ETH': <EthwColorful style={{ fontSize: 20 }} />,
    'PAK': <span style={{ fontSize: 20 }}><BoneCircleColorful /></span>,
    'HEI': <span style={{ fontSize: 20 }}><ShibCircleColorful /></span>,
    'JORE': <span style={{ fontSize: 20 }}><YooshiCircleColorful /></span>,
    'STEP': <span style={{ fontSize: 20 }}><MonaCircleColorful /></span>,
    'ALAN': <span style={{ fontSize: 20 }}><DoboCircleColorful /></span>,
    'FRMS': <span style={{ fontSize: 20 }}><PlbtColorful /></span>,
  };
  const IconComponent = assetIconMap[asset] || <PayCircleFilled style={{ fontSize: 20 }} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {IconComponent}
      <span style={{ marginLeft: 8, fontSize: 16 }}>{asset}</span>
    </div>
  );
};

export const renderCoinLarge = (shortForm: string) => {

  const assetIconMap: { [key: string]: React.ReactNode } = {
    'BTC': <BitcoinCircleColorful style={{ fontSize:30 }} />,
    'ETH': <EthwColorful style={{ fontSize: 30 }} />,
    'PAK': <span style={{ fontSize: 30 }}><BoneCircleColorful/></span>,
    'HEI': <span style={{ fontSize: 30 }}><ShibCircleColorful/></span>,
    'JORE': <span style={{ fontSize: 30 }}><YooshiCircleColorful /></span>,
    'STEP': <span style={{ fontSize: 30 }}><MonaCircleColorful/></span>,
    'ALAN': <span style={{ fontSize: 30 }}><DoboCircleColorful /></span>,
    'FRMS': <span style={{ fontSize: 30 }}><PlbtColorful /></span>,
  };

  const coinNameMap: { [key: string]: string } = {
    'BTC': 'BitCoin',
    'ETH': 'Ethereum',
    'PAK': 'PAK Coin',
    'HEI': 'Hei Coin',
    'JORE': 'Jorey Coin',
    'STEP': 'Stephanie Coin',
    'ALAN': 'Coin Alan',
    'FRMS': 'Forms Coin',
  };
  const icon = assetIconMap[shortForm];
  const name = coinNameMap[shortForm];
  return (
    <div style={{ display: 'flex' }}>
      <div style={{
        fontSize: 25,
        marginLeft: '63px',
        marginRight: '10px',
      }}>
        {icon}
      </div>
      <div>
        <h1 style={{
          fontSize: '15px',
          color: '#000000',
        }}>{name}</h1>
        <h2>{shortForm}</h2>
      </div>
    </div>
  );
};
export const renderCoinMiddle = (shortForm: string) => {

  const assetIconMap: { [key: string]: React.ReactNode } = {
    'BTC': <BitcoinCircleColorful style={{ fontSize:30 }} />,
    'ETH': <EthwColorful style={{ fontSize: 30 }} />,
    'PAK': <span style={{ fontSize: 30 }}><BoneCircleColorful/></span>,
    'HEI': <span style={{ fontSize: 30 }}><ShibCircleColorful/></span>,
    'JORE': <span style={{ fontSize: 30 }}><YooshiCircleColorful /></span>,
    'STEP': <span style={{ fontSize: 30 }}><MonaCircleColorful/></span>,
    'ALAN': <span style={{ fontSize: 30 }}><DoboCircleColorful /></span>,
    'FRMS': <span style={{ fontSize: 30 }}><PlbtColorful /></span>,
  };

  const coinNameMap: { [key: string]: string } = {
    'BTC': 'BitCoin',
    'ETH': 'Ethereum',
    'PAK': 'PAK Coin',
    'HEI': 'Hei Coin',
    'JORE': 'Jorey Coin',
    'STEP': 'Stephanie Coin',
    'ALAN': 'Coin Alan',
    'FRMS': 'Forms Coin',
  };
  const icon = assetIconMap[shortForm];
  const name = coinNameMap[shortForm];
  return (
    <div style={{ display: 'flex' }}>
      <div style={{
        fontSize: 20,
        marginRight: '10px',
        marginTop: '5px',
      }}>
        {icon}
      </div>
      <div>
        <h1 style={{
          fontSize: '15px',
          color: '#000000',
        }}>{name}</h1>
        <h2>{shortForm}</h2>
      </div>
    </div>
  );
};

export const calculateCoinsNeeded = (shortForm: string, requiredValue: number): number | null => {
  const coin = coinArray.find(c => c.Symbol === shortForm);
  if (!coin) {
    return null; // 如果找不到指定的币种，返回null
  }
  return requiredValue / coin.price;
};




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

// Function to get the full name of the coin
export const getFullName = (shortForm: string) => {
  const coin = coinArray.find(c => c.Symbol === shortForm);
  return coin ? coin.Name : shortForm;
};

export const renderLoanDuration = (text: null, record: { loanDuration: any; }) => {
  return `${record.loanDuration} Months`;
};

export const getCoinValue = (shortForm: string, amount: number): number => {
  if (shortForm === 'BTC')
    return 455643.15 * amount;
  if (shortForm === 'ETH')
    return 20676.21 * amount;
  const coin = coinArray.find(c => c.Symbol === shortForm);
  if (!coin) {
    return -1;
  }
  return coin.price * amount;
};

export const renderValue = (value: number): string => {
  return `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
};


export const renderCoinValue = (shortForm: string, amount: number) => {
  const value = getCoinValue(shortForm, amount);
  return renderValue(value);
};

export const renderAmount = (amount: number) => {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(amount);
};

export const renderDate = (date: string) => {
  const _date = new Date(date);
  const formattedDate = _date.toISOString().slice(0, 16).replace('T', ' ');
  return formattedDate;
};

export const calculateDateDifference = (date: string): string => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const timeDifference = Math.abs(targetDate.getTime() - currentDate.getTime());

  const months = Math.floor(timeDifference / (1000 * 3600 * 24 * 30));
  const days = Math.floor((timeDifference % (1000 * 3600 * 24 * 30)) / (1000 * 3600 * 24));
  const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  const parts = [
    { value: months, unit: 'Months' },
    { value: days, unit: 'Days' },
    { value: hours, unit: 'Hours' },
    { value: minutes, unit: 'Minutes' },
    { value: seconds, unit: 'Seconds' }
  ];

  const nonZeroParts = parts.filter(part => part.value > 0).slice(0, 2);
  const formattedDifference = nonZeroParts.map(part => `${part.value} ${part.unit}`).join(' ');

  return formattedDifference || '0 Seconds';
};