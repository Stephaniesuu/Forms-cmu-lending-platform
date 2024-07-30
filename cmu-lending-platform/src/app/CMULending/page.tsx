'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
      {account.isConnected ? (
        <div className='justify-center w-screen h-auto'>
          <div>
            <div>
              You have successfully connected your wallet. 🎉
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