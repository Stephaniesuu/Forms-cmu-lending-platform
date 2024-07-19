'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { Address } from '@ant-design/web3';
import { useAccount } from 'wagmi'
import { Button } from "@material-tailwind/react";

export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
      {account.isConnected ? (
        <div>
          <h1>Your account is</h1>
          <div className=' border-spacing-1'>
            <Address
              ellipsis={{
                headClip: 8,
                tailClip: 6,
              }}
              copyable
              address={account.address}
            />
          </div>
        </div>) :(
          <div>
            Please connect your wallet first.🤣
          </div>
        )}
    </APPLayout>

  );

}