'use client'

import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
import { Row, Col } from 'antd';
import { NFTCard } from '@ant-design/web3';
import Title from 'antd/es/typography/Title';

const style: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '12px',
  height: '100%',
  borderRadius: '6px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
};

export default function CMULending() {
  const account = useAccount()
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <p> This is for dashboard</p>
            <NFTCard
              name="My NFT"
              tokenId={16}
              price={{
                value: BigInt('1230000000000000000'),
              }}
              like={{
                totalLikes: 1600,
              }}
              description="This is description"
              showAction
              footer="This is footer"
              image="https://api.our-metaverse.xyz/ourms/6_pnghash_0cecc6d080015b34f60bdd253081f36e277ce20ceaf7a6340de3b06d2defad6a_26958469.webp"
            />

          </div>
        </Col>
        <Col className="gutter-row" span={12}>

        <div style={style}>
            <Title> This is for Dashboard Ma</Title>
            <p>  {account.address}</p>
          </div>
        </Col>
      </Row>
    </APPLayout>

  );

}