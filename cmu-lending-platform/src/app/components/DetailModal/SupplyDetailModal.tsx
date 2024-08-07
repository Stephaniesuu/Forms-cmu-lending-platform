'use client';

import { Button, Card, Select, ConfigProvider, Tooltip, Alert } from "antd";
import { useState } from "react";

import { CloseOutlined, MoneyCollectOutlined, FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { BitcoinCircleColorful, EthereumCircleColorful } from '@ant-design/web3-icons';
import AccountDisplay from "./AccountDisplay";
import SupplyLock from "./Supply/SupplyLock";
import SupplyStatus from "./Supply/SupplyStatus";
import SupplyLiquidation from "./Supply/SupplyLiquidation";

const tabList = [
    {
        key: 'Lock',
        tab: 'Lock',
    },
    {
        key: 'Status',
        tab: 'Status',
    },
    {
        key: 'Liquidate',
        tab: 'Liquidate',
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
    marginRight: '63px',
};

export const h3Style = {
    // position: 'fixed',
    fontSize: '16px',
    // color: '#0F1D40',
    // fontWeight: 'bold',
    fontntFamily: 'Poppins',
    marginLeft: '63px',
    marginBottom: '10px',
    marginRight: '63px',
};

export const IcontextStyle = {
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
  height: 700px; /* Adjust based on your preference */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  radius: 16px;
`;

export default function SupplyDetailButton({ contract }) {

    const [showCard, setShowCard] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState<string>('Lock');
    const [isBorrow, setIsBorrow] = useState(false);
    const [isLocked, setIsLocked] = useState(contract.status !== 'Pending');
    const [isLiquidated, setIsLiquidated] = useState(contract.status !== 'Active');
    const onTabChange = (key: React.SetStateAction<string>) => {
        setActiveTabKey(key);
    };

    const contentList: { [key: string]: React.ReactNode } = {
        Lock: (
            <SupplyLock
                IsLocked={isLocked}
                SetIsLocked={setIsLocked}
                contract={contract}
            />
        ),
        Status: (
            <SupplyStatus
                contract={contract}
            />
        ),
        Liquidate: (
            <SupplyLiquidation
                IsLiquidated={isLiquidated}
                SetIsLiquidated={setIsLiquidated}
                contract={contract}
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
                        style={modalStyle}
                        title={
                            <>
                                <Button
                                    type="text"
                                    icon={<CloseOutlined />}
                                    onClick={() => setShowCard(false)}
                                    style={{ border: 'none', boxShadow: 'none', position: 'absolute', right: 20, top: 20 }}
                                />
                                <AccountDisplay IsBorrow={isBorrow} counterpartyAddress={contract.seller} />
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
                    </StyledCard>

                </>
            )}
        </>
    );

}