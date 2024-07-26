'use client';

import React from 'react';
import { ConnectButton as RainbowConnectButton } from "@rainbow-me/rainbowkit";
import { Connector, ConnectButton as AntdConnectButton, type Chain } from "@ant-design/web3";


const WalletConnector = () => {
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
            src: 'https://mdn.alipayobjects.com/huamei_mutawc/afts/img/A*9jfLS41kn00AAAAAAAAAAAAADlrGAQ/original',
          }}
          actionsMenu
        />
      </Connector>
    </div>
  );
};

export default WalletConnector;