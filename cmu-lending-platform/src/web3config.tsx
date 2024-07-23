// Code: Web3 configuration for the application

import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
  mantleSepoliaTestnet
} from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';


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
