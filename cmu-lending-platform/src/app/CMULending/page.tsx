'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { Address } from '@ant-design/web3';
import { useAccount } from 'wagmi'

export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
      {account.isConnected ? (
        
        <div className='justify-center w-screen h-auto'>
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