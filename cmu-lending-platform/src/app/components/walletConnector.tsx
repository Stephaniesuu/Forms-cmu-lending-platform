'use client';

import React, { useEffect, useRef } from 'react';
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Connector, ConnectButton as AntdConnectButton, type Chain } from "@ant-design/web3";
import createWeb3Avatar from 'web3-avatar';
import { useAccount } from 'wagmi';
import { Sepolia, Mainnet } from '@ant-design/web3-assets';


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
  // const [chain, setChain] = React.useState<Chain>(Mainnet);
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
          avatar={{
            src: <CustomAvatar Address={currentAccount.address || ''} />,
          }}
          actionsMenu
          profileModal={{
            width: 400,
          }}
          // availableChains={[Mainnet, Sepolia]}
          // onSwitchChain={async (c) => {
          //   setChain(c);
          // }}
          // chain={chain}
        />
      </Connector>
    </div>
  );
};

export default WalletConnector;