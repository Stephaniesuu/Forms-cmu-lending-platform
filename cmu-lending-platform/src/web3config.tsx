'use client'

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
    mantle,
  } from 'wagmi/chains';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from '@wagmi/core';

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
  