'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { Address } from '@ant-design/web3';
import { getAccount } from 'wagmi/actions';
import {config} from '../../web3config';

const { address } = getAccount(config);

export default function CMULending() {
  return (
    <APPLayout>
      <div>
        <Address
          ellipsis={{
            headClip: 8,
            tailClip: 6,
          }}
          copyable
          address={address}
        />
      </div>
    </APPLayout>

  );

}