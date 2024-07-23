// only for web3 functionality
'use client';
import * as React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config_rainbowkit, config_antd } from "../web3config";
import { mainnet, sepolia,mantleSepoliaTestnet } from 'viem/chains';
import {
  MetaMask,
  OkxWallet,
  TokenPocket,
  WagmiWeb3ConfigProvider,
  WalletConnect,
} from '@ant-design/web3-wagmi';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config_rainbowkit}>
      <WagmiWeb3ConfigProvider
        config={config_antd}
        eip6963={{
          autoAddInjectedWallets: true,
        }}
        chains={[mainnet, sepolia, mantleSepoliaTestnet]}
        wallets={[
          MetaMask(),
          WalletConnect(),
          TokenPocket(),
          OkxWallet({ group: 'Popular' }),
        ]}
      >
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiWeb3ConfigProvider>
    </WagmiProvider >
  );
}