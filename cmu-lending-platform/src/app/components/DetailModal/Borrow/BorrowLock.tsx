'use client';

import { Alert, Button, message, Select } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { useState } from "react";
import { BitcoinCircleColorful, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import { renderCoin } from "../../Table/functions";

const alertStyle = {

    position: 'fixed',
    top: '50%',
    left: '50%',
    width: '400px',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000, // High z-index to make sure it is on top
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '40px'

}


export default function BorrowLock({ IsLocked, SetIsLocked, RecordData }: { IsLocked: boolean, SetIsLocked: Function, RecordData: object  }) {
    const asset = RecordData.asset;
    /**
     * This function is used to toggle the alert (old version)
        const [lockAlertVisible, setLockAlertVisible] = useState(false);
        const handleCloseAlert = () => {
        setLockAlertVisible(false); // 关闭警告
        };
    **/
    const toggleAlert = () => {
        // setLockAlertVisible(!lockAlertVisible);
        SetIsLocked(true);
        message.success('Lock successful');
    };

    const AssetDisplay = () => {
        
        return (
            <div>
                <p style={{
                    fontSize: '12px',
                    color: '#525C76',
                    marginLeft: '63px',
                }}>Collateral</p>
                <div style={{
                    display: 'flex',
                    marginLeft: '63px',
                    marginBottom: '20px'
                }}>
                    {renderCoin(asset)}
                </div>
            </div>
        );
    };
    const assetIconMap: { [key: string]: React.ReactNode } = {
        'BTC': <BitcoinCircleColorful style={{ fontSize: 30 }} />,
        'ETH': <EthwColorful style={{ fontSize: 30 }} />,
    };
    const IconComponent = assetIconMap[asset] || <PayCircleFilled style={{ fontSize: 30 }} />;

    return (
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
                <h2 style={h2Style} >Lock your current collateral for getting coins</h2>
            </header>
            <div>
                {/* <p style={h1Style}>Collateral</p> */}
                <AssetDisplay />
                {/* <Select
                    defaultValue="Select"
                    style={{ width: 120, marginLeft: '63px', marginBottom: '20px' }}
                    options={[
                        { value: 'Ethereum', label: 'Ethereum' },
                        { value: 'BitCoin', label: 'BitCoin' },
                        { value: 'PakCoin', label: 'PakCoin' },
                        { value: 'HeiCoin', label: 'HeiCoin' },
                    ]}
                /> */}
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
                    disabled={IsLocked}
                >{IsLocked ? 'Locked' : 'Lock'}</Button>
                {/* {lockAlertVisible && (
                    <Alert
                        showIcon
                        message="Success Text"
                        description="Lock has been done. Now you can withdraw your coins."
                        type="success"
                        closable={true}
                        onClose={handleCloseAlert}
                        style={alertStyle}
                    />
                )} */}
            </div>
        </div>
    )
}