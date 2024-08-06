import { Tooltip } from "antd";
import { coinArray } from '../../data/coinsPrice';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';

export const renderCoin = (asset: string) => {
  const assetIconMap: { [key: string]: React.ReactNode } = {
    'BTC': <BitcoinCircleColorful style={{ fontSize: 20 }} />,
    'ETH': <EthwColorful style={{ fontSize: 20 }} />,
    'PAK': <span style={{ fontSize: 20 }}>🫄</span>,
    'HEI': <span style={{ fontSize: 20 }}>🫄🏿</span>,
    'JORE': <span style={{ fontSize: 20 }}>🏂</span>,
    'STEP': <span style={{ fontSize: 20 }}>🐈‍⬛</span>,
    'ALAN': <span style={{ fontSize: 20 }}>👽</span>,
    'FRMS': <span style={{ fontSize: 20 }}>💩</span>,
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
    'PAK': <span style={{ fontSize: 30 }}>🫄</span>,
    'HEI': <span style={{ fontSize: 30 }}>🫄🏿</span>,
    'JORE': <span style={{ fontSize: 30 }}>🏂</span>,
    'STEP': <span style={{ fontSize: 30 }}>🐈‍⬛</span>,
    'ALAN': <span style={{ fontSize: 30 }}>👽</span>,
    'FRMS': <span style={{ fontSize: 30 }}>💩</span>,
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
    'PAK': <span style={{ fontSize: 30 }}>🫄</span>,
    'HEI': <span style={{ fontSize: 30 }}>🫄🏿</span>,
    'JORE': <span style={{ fontSize: 30 }}>🏂</span>,
    'STEP': <span style={{ fontSize: 30 }}>🐈‍⬛</span>,
    'ALAN': <span style={{ fontSize: 30 }}>👽</span>,
    'FRMS': <span style={{ fontSize: 30 }}>💩</span>,
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
  const coin = coinArray.find(c => c.shortForm === shortForm);
  if (!coin) {
    return null; // 如果找不到指定的币种，返回null
  }
  return requiredValue / coin.value;
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
export const getFullName = (shortForm) => {
  const coin = coinArray.find(c => c.shortForm === shortForm);
  return coin ? coin.name : shortForm;
};

export const renderLoanDuration = (text, record) => {
  return `${record.loanDuration} Months`;
};

export const getCoinValue = (shortForm: string, amount: number): number => {
  const coin = coinArray.find(c => c.shortForm === shortForm);
  if (!coin) {
    return -1;
  }
  return coin.value * amount;
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