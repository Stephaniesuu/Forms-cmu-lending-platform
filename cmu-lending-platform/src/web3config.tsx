// Code: Web3 configuration for the application

import {
<<<<<<< HEAD
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    mantle,
  } from 'wagmi/chains';

=======
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  mantleSepoliaTestnet
} from 'wagmi/chains';
>>>>>>> stephanie
import { getDefaultConfig } from '@rainbow-me/rainbowkit';

<<<<<<< HEAD
const mantleChain = {
  id: 5003, // Mantle 网络的 Chain ID
  name: 'Mantle',
  network: 'mantle',
  nativeCurrency: {
    name: 'Mantle',
    symbol: 'MNT',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://rpc.sepolia.mantle.xyz/',
  },
  blockExplorers: {
    default: { name: 'Mantle Explorer', url: 'https://explorer.sepolia.mantle.xyz/' },
  },
  testnet: false,
};
export const config = getDefaultConfig({
    appName: 'cmu-lending-platform',
    projectId: '0f19e038366ede3e72b702d62f1eafbc',
    chains: [sepolia, mainnet, polygon, optimism, arbitrum, base, mantleChain],
    ssr: true,
    transports:{
      
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [mantleChain.id]: http(mantleChain.rpcUrls.default),
    }
  });
  
=======

import { http, cookieStorage, createStorage, createConfig } from 'wagmi';
import { injected } from "wagmi/connectors";



// for rainbowkit
export const config_rainbowkit = getDefaultConfig({
  appName: 'cmu-lending-platform',
  projectId: '0f19e038366ede3e72b702d62f1eafbc',
  chains: [sepolia, mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {

    [mainnet.id]: http(),
    [sepolia.id]: http(),


  }
});

// for antd web3
export const config_antd = createConfig({
  // chains: [sepolia, mainnet, polygon, optimism, arbitrum, base],
  chains: [sepolia, mainnet, mantleSepoliaTestnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {

    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [mantleSepoliaTestnet.id]: http(),

  },
  connectors: [
    injected({
      target: "metaMask",
    }),
  ],
});
>>>>>>> stephanie
