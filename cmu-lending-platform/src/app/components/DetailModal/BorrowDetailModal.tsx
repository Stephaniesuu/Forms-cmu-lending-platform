'use client';

import { Button, Card, Flex, Modal } from "antd";
import { useState } from "react";
import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import AccountDisplay from './AccountDisplay';
import BorrowLock from './Borrow/BorrowLock';
import BorrowWithdraw from './Borrow/BorrowWithdraw';
import BorrowRepay from './Borrow/BorrowRepay';
import { RecordDataType } from "../../data/metadata_interface";
import { Address } from '@ant-design/web3';
import 'animate.css';



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

export const h1Style = {
  // position: 'fixed',
  fontSize: '12px',
  color: '#525C76',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '63px',
};

export const h2Style = {
  // position: 'fixed',
  fontSize: '16px',
  // color: '#0F1D40',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '63px',
  marginBottom: '20px',
};
export const IcontextStyle = {
  // position: 'fixed',
  fontSize: '28px',
  color: '#8247E5',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '10px',
};


const backdropStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999, // Just below the modal
};

const StyledCard = styled(Card)`
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* High z-index to make sure it is on top */
  width: 651px; /* Adjust based on your preference */
  height: 730px; /* Adjust based on your preference */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  radius: 16px;
`;



export default function BorrowDetailButton({ contract }: { contract: RecordDataType }) {
  const [showCard, setShowCard] = useState(false);
  const [activeTabKey, setActiveTabKey] = useState<string>('Lock');
  const [isBorrow, setIsBorrow] = useState(true);
  // const [isLocked, setIsLocked] = useState(contract.status !== 'Pending');
  const [isLocked, setIsLocked] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(contract.status !== 'Active');
  const [isRepay, setIsRepay] = useState(contract.status !== 'Active');
  const onTabChange = (key: React.SetStateAction<string>) => {
    setActiveTabKey(key);
  };
  const contentList: { [key: string]: React.ReactNode } = {
    Lock: (
      <BorrowLock
        IsLocked={isLocked}
        SetIsLocked={setIsLocked}
        RecordData={contract}
      />
    ),
    Withdraw: (
      <BorrowWithdraw
        IsWithdraw={isWithdraw}
        SetIsWithdraw={setIsWithdraw}
        RecordData={contract}
      />
    ),
    Repay: (
      <BorrowRepay
        IsRepay={isRepay}
        SetIsRepay={setIsRepay}
        RecordData={contract}
      />
    ),
  };


  return (

    <>
      <Button type="primary" onClick={() => setShowCard(!showCard)}>Details</Button>
      {showCard && (
        <>
          <div style={backdropStyle} onClick={() => setShowCard(false)}></div>
          <StyledCard
            // style={modalStyle}
            title={
              <>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setShowCard(false)}
                  style={{ border: 'none', boxShadow: 'none', position: 'absolute', right: 20, top: 20 }}
                />

                <AccountDisplay IsBorrow={isBorrow} counterpartyAddress={contract.buyer} />
              </>

            }

            tabList={tabList}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
          >

            <div style={{
              display: 'flex',
              height: '405px',
              gap: '100px',
              background: 'rgba(234, 72, 92, 0.05)',
              borderRadius: '16px',
            }}>
              {contentList[activeTabKey]}

            </div>
            <div style={{display:'flex', justifyItems:'center',alignItems:'center',width:'100%', marginTop:'10px'}}>
                  <h1 style={{marginRight:'3px'}}>Contract Adress:</h1>
                  <Address
                    ellipsis={{
                      headClip: 8,
                      tailClip: 6,
                    }}
                    copyable
                    address={contract.address}
                  />
                </div>
          </StyledCard>
        </>
      )}
    </>
  );

}
