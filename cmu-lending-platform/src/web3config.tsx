'use client'

import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
    sepolia,
  } from 'wagmi/chains';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from '@wagmi/core';


export const config = getDefaultConfig({
    appName: 'cmu-lending-platform',
    projectId: '0f19e038366ede3e72b702d62f1eafbc',
    chains: [sepolia, mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
    transports:{
      
        [mainnet.id]: http(),
        [sepolia.id]: http(),
      
    }
  });
  