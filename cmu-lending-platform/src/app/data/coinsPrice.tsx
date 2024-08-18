export const coinArray = [
  {
    "Name": "Pak Coin",
    "Symbol": "PAK",
    "address": "0x3DD8e3eb70a2603a35DeeCD6E3214A0B048C3211",
    "price": 246.8,
  },
  {
    "Name": "Hei Coin",
    "Symbol": "HEI",
    "address": "0x51b4930C2Fb9276d8c04483dD03F76e8D42598dC",
    "price": 678.9,
  },
  {
    "Name": "Jorey Coin",
    "Symbol": "JORE",
    "address": "0xA61188cc041B24a5C5A78A06C72eB31b95Bc6B17",
    "price": 345.6,
  },
  {
    "Name": "Stephanie Coin",
    "Symbol": "STEP",
    "address": "0xca2859637403fa5e426dAeB0aA8Ee5e1110e16F8",
    "price": 567.8,
  },
  {
    "Name": "Coin Alan",
    "Symbol": "ALAN",
    "address": "0xC7a751aD3C0a297cb9fb45E267A3dEf129831a5B",
    "price": 100.2,
  },
  {
    "Name": "Forms Coin",
    "Symbol": "FRMS",
    "address": "0x87807C9a722bC7d545fBb77CA540B23dA66E18BE",
    "price": 1000.0,
  }
];

export const getSymbolByAddress = (address: string): string | null => {
  const coin = coinArray.find(coin => coin.address.toLowerCase() === address.toLowerCase());
  return coin ? coin.Symbol : null;
}

export const getPriceByAddress = (address: string): number => {
  const coin = coinArray.find(coin => coin.address.toLowerCase() === address.toLowerCase());
  return coin ? coin.price : 0;
}

export const renderValue = (value: number): string => {
  return `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value)}`;
};

export const renderCoinValue = (address: string, amount: number) => {
  if (address === 'BTC')
      return renderValue(455643.15 * amount);
  if (address === 'ETH')
      return renderValue(20676.21 * amount);
  const value = getPriceByAddress(address) * amount;
  return renderValue(value);
};