'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { Address } from '@ant-design/web3';
import { useAccount } from 'wagmi'
import { NFTCard } from '@ant-design/web3';
export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
      {account.isConnected ? (
        <div className='justify-center w-screen h-auto'>
          <div>

            <div>

            </div>
          </div>
        </div>) : (
        <div>
          Please connect your wallet first.🤣
        </div>
      )}
    </APPLayout>

  );

}