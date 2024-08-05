'use client';

import { Button, Card, Select, ConfigProvider, Tooltip,Alert } from "antd";
import { useState } from "react";

import { CloseOutlined, MoneyCollectOutlined, FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { BitcoinCircleColorful, EthereumCircleColorful } from '@ant-design/web3-icons';
import AccountDisplay from "./AccountDisplay";


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
const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};


const h1Style = {
    // position: 'fixed',
    fontSize: '12px',
    color: '#525C76',
    // fontWeight: 'bold',
    fontntFamily: 'Poppins',
    marginLeft: '63px',
};

const h2Style = {
    // position: 'fixed',
    fontSize: '16px',
    // color: '#0F1D40',
    // fontWeight: 'bold',
    fontntFamily: 'Poppins',
    marginLeft: '63px',
    marginBottom: '20px',
    marginRight: '63px',
};
const h3Style = {
    // position: 'fixed',
    fontSize: '16px',
    // color: '#0F1D40',
    // fontWeight: 'bold',
    fontntFamily: 'Poppins',
    marginLeft: '63px',
    marginBottom: '10px',
    marginRight: '63px',
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
const text = <p>Liquidation will performed automatically once the value decrease exceeds the margin.</p>;
const contentList = (toggleAlert, alertVisible, isButtonDisabled, handleCloseAlert) => ({
    Lock: (
        <div style={{ width: "100%" }}>
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
                <h2 style={h2Style} >Lock the coins for the borrower.</h2>
            </header>
            <div>
                <p style={h1Style}>Coin</p>
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Button type='primary' style={
                    {
                        width: '400px',
                        height: '40px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginBottom: '37px',
                    }}>Lock</Button>
            </div>
        </div>
    ),
    Status: (
        <div style={{ width: "100%" }}>
            <header >
                <div style={{
                    display: 'flex',
                    marginLeft: '63px',
                    marginTop: '37px',

                }}>
                    <FileSearchOutlined style={{
                        width: '30px',
                        height: '30px',
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontSize: 30,
                        color: '#8247E5',
                    }} />
                    <h1 style={IcontextStyle}>Status</h1>
                </div>
                {/* <h2 style={h2Style} >repay your borrowed coins and get collateral back</h2> */}
            </header>
            <div style={{ display: 'flex', marginBottom: '10px', }}>
                <div style={{ display: 'flex', }}>
                    <div>
                        <p style={h1Style}>Collateral</p>
                        <div style={{ display: 'flex', }}>

                            <EthereumCircleColorful style={{
                                fontSize: 30,
                                marginLeft: '63px',
                                // marginTop: '20px',
                                marginRight: '10px',
                            }} />
                            <div>
                                <h1 style={{
                                    fontSize: '15px',
                                    color: '#000000',
                                }}>Ethereum</h1>
                                <h2>ETH</h2>
                            </div>
                        </div>
                    </div>
                    <div style={{ marginLeft: '63px' }}>
                        <p style={h1Style}>Repayment</p>
                        <div style={{ display: 'flex' }}>

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
                </div>
            </div>
            <div style={{ display: "flex" }}>
                <div>
                    <h1 style={h1Style}>
                        Total Amount
                    </h1>
                    <h2 style={{
                        fontSize: '20px',
                        color: '#0F1D40',
                        marginLeft: '63px',
                    }}>44.240000</h2>
                </div>
                <div style={{ marginLeft: '63px' }}>
                    <h1 style={h1Style}>
                        Total Amount
                    </h1>
                    <h2 style={{
                        fontSize: '20px',
                        color: '#0F1D40',
                        marginLeft: '63px',
                    }}>2.479000</h2>
                </div>
            </div>
            <div style={{ marginTop: '5px', marginBottom: '20px' }}>
                <div style={{ display: 'flex' }}>
                    <h1 style={h1Style}>Current Value </h1>
                    <div>
                        <Tooltip placement="rightTop" title={text} arrow={false}>
                            <QuestionCircleOutlined style={{ fontSize: 15, color: '#8247E5', marginLeft: '10px' }} />
                        </Tooltip>
                    </div>
                </div>
                <p style={h3Style}>1,162,850.02</p>
                <p style={h1Style}>Deposit time</p>

            </div>

            <div style={{ marginTop: '5px' }}>
                <h1 style={h1Style}>Remaining time </h1>
                <p style={h3Style}>2 months 29 days</p>
            </div>
        </div>
    ),
    Liquidate: (
        <div style={{ width: "100%" }}>
            <header >
                <div style={{
                    display: 'flex',
                    marginLeft: '63px',
                    marginTop: '37px',
                }}>
                    <MoneyCollectOutlined style={{
                        fontSize: 30,
                        marginTop: '10px',
                        marginRight: '5px',
                        marginBottom: '5px',
                        color: '#8247E5',
                    }} />
                    <h1 style={IcontextStyle}>Liquidation</h1>
                </div>
                <h2 style={h3Style} >All collateral will transfer to your wallet if the repayment is overdue.</h2>
            </header>
            <div >
                <p style={h1Style}>Collateral</p>
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
            <div >
                <h1 style={h1Style}>Amount </h1>
                <p style={h3Style}>4.000,000</p>
            </div>
            <div >
                <h1 style={h1Style}>Deadline </h1>
                <p style={h3Style}>24 June 2024</p>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '11px',
                paddingBottom: '0px',
            }}>
                <Button type="primary" style={
                    {
                        width: '400px',
                        height: '40px',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        marginBottom: '37px',
                    }}
                    onClick={toggleAlert}
                    disabled={isButtonDisabled}
                >Liquidation</Button>
                {alertVisible && (
                    <Alert
                        message="Success Text"
                        description="Liquidation has been done. The contract is terminated."
                        type="success"
                        closable={true}
                        onClose={handleCloseAlert}
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            width: '400px',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 1000, // High z-index to make sure it is on top
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            padding: '40px'
                        }}
                    />
                )}
            </div>
        </div>
    ),
});

export default function BorrowDetailButton() {
    const [showCard, setShowCard] = useState(false);
    const [activeTabKey, setActiveTabKey] = useState<string>('Lock');
    const [isBorrow, setIsBorrow] = useState(false);
    const [alertVisible, setAlertVisible] = useState(false);
    const onTabChange = (key: React.SetStateAction<string>) => {
        setActiveTabKey(key);
    };
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const toggleAlert = () => {
        setAlertVisible(!alertVisible);
        setIsButtonDisabled(true);
    };
    const handleCloseAlert = () => {
        setAlertVisible(false); // 关闭警告
        // 注意这里不重置按钮的禁用状态
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
                                <AccountDisplay IsBorrow={isBorrow} />
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
                            {contentList(toggleAlert, isButtonDisabled, alertVisible,)[activeTabKey]}
                        </div>
                    </StyledCard>

                </>
            )}
        </>
    );

}