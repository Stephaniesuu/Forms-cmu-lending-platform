'use client'
import React, { useState } from 'react';
import { Card, Select, Space } from 'antd';
import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
import { Row, Col, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { BitcoinCircleColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import '../Market/style.css';
const { Title } = Typography;
// import { Address, NFTCard } from '@ant-design/web3';

const tabList = [
  {
    key: 'Lock',
    tab: 'Lock',
  },
  {
    key: 'Withdraw',
    tab: 'Withdraw',
  },
  {
    key: 'Repay',
    tab: 'Repay',
  },
];
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const style: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '12px',
  height: '100%',
  borderRadius: '6px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',

};
const h1Style = {
  // position: 'fixed',
  fontSize: '12px',
  color: '#525C76',
  display: 'flex',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '63px',
};

const h2Style = {
  // position: 'fixed',
  fontSize: '16px',
  color: '#0F1D40',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '63px',
  marginBottom: '20px',
};
const IcontextStyle = {
  // position: 'fixed',
  fontSize: '28px',
  color: '#8247E5',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '10px',
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000, // High z-index to make sure it is on top
  width: '651px', // Adjust based on your preference
  highth: '600px', // Adjust based on your preference
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '40px',
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999, // Just below the modal
};
const contentList = {
  Lock: (
    <div>
      <header >
        <div style={{
          display: 'flex',
          marginLeft: '63px',
          marginTop: '37px',
        }}>
          <img src='images/Lockicon.png' alt='Lock' style={{
            width: '30px',
            height: '30px',
            marginTop: '10px',
          }} />
          <h1 style={IcontextStyle}>Lock</h1>
        </div>
        <h2 style={h2Style} >Lock your current collateral for getting coins</h2>
      </header>
      <div>
        <p style={h1Style}>Collateral</p>
        <Select
          defaultValue="Select"
          style={{ width: 120, marginLeft: '63px', marginBottom: '20px' }}
          onChange={handleChange}
          options={[
            { value: 'Ethereum', label: 'Ethereum' },
            { value: 'BitCoin', label: 'BitCoin' },
            { value: 'PakCoin', label: 'PakCoin' },
            { value: 'HeiCoin', label: 'HeiCoin' },
          ]}
        />
      </div>
      <div>
        <h1 style={h1Style}>Amount Required</h1>
        <p style={h2Style}>To be estimated</p>
      </div>
      <div>
        <h1 style={h1Style}>Remaining time</h1>
        <p style={h2Style}>23 hours 59 minutes</p>
      </div>
      <button style={
        {
          width: '100%',
          height: '40px',
          background: '#C67EFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginLeft: '63px',
          marginBottom: '45px',
        }

      }>Lock</button>
    </div>
  ),
  Withdraw: (<div>
    <header >
      <div style={{
        display: 'flex',
        marginLeft: '63px',
        marginTop: '37px',
      }}>
        <img src='images/Lockicon.png' alt='Lock' style={{
          width: '30px',
          height: '30px',
          marginTop: '10px',
        }} />
        <h1 style={IcontextStyle}>Withdraw</h1>
      </div>
      <h2 style={h2Style} >Withdraw your Loan Coin</h2>
    </header>
    <div>
      <p style={h1Style}>Coin</p>
      <div style={{ display: 'flex', }}>
        <BitcoinCircleColorful style={{
          fontSize: 30,
          marginLeft: '63px',
          // marginTop: '20px',
          marginRight: '10px',
        }} />
        <div>
          <h1 style={{
            fontSize: '15px',
            color: '#000000',
          }}>BitCoin</h1>
          <h2>BTC</h2>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '20px', }}>
      <h1 style={h1Style}>Amount </h1>
      <p style={h2Style}>4.000,000</p>
    </div>
    <div>
    </div>
    <button style={
      {
        width: '150%',
        height: '40px',
        background: '#C67EFF',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: '63px',
        marginBottom: '45px',
      }

    }>Lock</button>
  </div>
  ),
  Repay: (<div>
    <header >
      <div style={{
        display: 'flex',
        marginLeft: '63px',
        marginTop: '37px',
      }}>
        <img src='images/Lockicon.png' alt='Lock' style={{
          width: '30px',
          height: '30px',
          marginTop: '10px',
        }} />
        <h1 style={IcontextStyle}>Repay</h1>
      </div>
      <h2 style={h2Style} >repay your borrowed coins and get collateral back</h2>
    </header>
    <div style={{ marginTop: '20px' }}>
      <h1 style={h1Style}>Countdown </h1>
      <p style={h2Style}>24 Days</p>
    </div>
    <div style={{ display: 'flex', marginBottom: '20px', }}>
      <div>
        <p style={h1Style}>Coin</p>
        <div style={{ display: 'flex', }}>

          <BitcoinCircleColorful style={{
            fontSize: 30,
            marginLeft: '63px',
            // marginTop: '20px',
            marginRight: '10px',
          }} />
          <div>
            <h1 style={{
              fontSize: '15px',
              color: '#000000',
            }}>BitCoin</h1>
            <h2>BTC</h2>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '80px', }}>
        <h1 style={h1Style}>
          Total Amount
        </h1>
        <h2 style={{
          fontSize: '20px',
          color: '#0F1D40',
          marginLeft: '63px',
        }}>4.200,000</h2>

      </div>
    </div>

    <div>
    </div>
    <button style={
      {
        width: '85%',
        height: '40px',
        background: '#C67EFF',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: '63px',
        marginBottom: '45px',
      }

    }>Lock</button>
  </div>
  ),
};
export default function CMULending() {
  const account = useAccount()
  const [showCard, setShowCard] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState('tab1');

  const onTabChange = key => {
    setActiveTabKey(key);
  };
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <p> This is for Market</p>
            <Button type="primary" onClick={() => setShowCard(!showCard)}>Toggle Card</Button>

          </div>
        </Col>
        {showCard && (
          <>
            <div style={backdropStyle} onClick={() => setShowCard(false)}></div>

            <Card
              className="custom-card"
              style={modalStyle}
              title={
                <>
                  <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setShowCard(false)}
                    style={{ border: 'none', boxShadow: 'none', position: 'absolute', right: 20, top: 20 }}
                  />
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '100px',
                    marginTop: '37px',
                    marginBottom: '27px',
                  }}>

                    <h2 style={h1Style}>
                      <p>Buyer Address</p>
                      <p>0x23...5678</p>
                    </h2>
                    <h2 style={{
                      position: 'fixed',
                      right: 105,
                    }}>
                      <div style={h1Style}>
                        <p>Seller Address</p>
                        <p>0x23...5678</p>
                      </div>
                    </h2>
                  </div>
                </>
              }

              tabList={tabList}
              activeTabKey={activeTabKey}
              onTabChange={onTabChange}
            >
              <div style={{
                display: 'flex',
                gap: '100px',
                background: 'rgba(234, 72, 92, 0.05)',
              }}>
                {contentList[activeTabKey]}

              </div>
            </Card>

          </>
        )}
        <Col className="gutter-row" span={12}>

          <div style={style}>
            <Title> This is for Market</Title>
            <p>  {account.address}</p>

          </div>
        </Col>
      </Row>
    </APPLayout>

  );

}