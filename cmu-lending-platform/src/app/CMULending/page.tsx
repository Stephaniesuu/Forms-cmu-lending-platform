'use client'

import { Flex } from 'antd';
import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%',alignContent:'center' }}>
          <p style={{ fontSize: '30px', textAlign: 'center',color:'#291648' }}>
            {account.isConnected ? '🎉 You have successfully connected your wallet. 🎉' : 'Please connect your wallet first.🤣'}
          </p>
        </div>
    </APPLayout>

  );

}