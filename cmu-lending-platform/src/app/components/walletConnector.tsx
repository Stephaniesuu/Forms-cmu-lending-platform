'use client';

import React, { useEffect,useRef } from 'react';
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Connector, ConnectButton as AntdConnectButton, type Chain } from "@ant-design/web3";
import createWeb3Avatar from 'web3-avatar';
import Web3Avatar from 'web3-avatar';
import { getAddress } from 'viem';
import { useAccount } from 'wagmi';



const CustomAvatar = ({ Address }: { Address: string }) => {
  const avatarRef = useRef(null);

  useEffect(() => {
    if (avatarRef.current) {
      createWeb3Avatar(avatarRef.current, Address);
    }
  }, [Address]);
  return <div ref={avatarRef} className=' w-16 h-16'></div>;
};


const WalletConnector = () => {
  const currentAccount = useAccount();

  return (
    <div className="flex items-center gap-2">

      {/* <RainbowConnectButton
        accountStatus={{
          smallScreen: 'avatar',
          largeScreen: 'full',
        }}
      /> */}

      <Connector>
        <AntdConnectButton
          style={{ color: 'white', fontSize: 'large', fontFamily: 'monospace' }}
          avatar={{
            src: <CustomAvatar Address={currentAccount.address || ''} />,
          }}
          actionsMenu
        />
      </Connector>
    </div>
  );
};

export default WalletConnector;