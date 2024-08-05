import { Alert, Button, message, Select } from "antd";
import { SetStateAction, useState } from "react";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import { dashboardTable } from '../../../components/Table/datatypes';
// import toggleAlert from "../BorrowDetailModal";
// import isButtonDisabled from "../BorrowDetailModal";
// import handleCloseAlert from "../BorrowDetailModal";
// import alertVisible from "../BorrowDetailModal";

export default function BorrowLock({ToggleAlert, AlertVisible, IsButtonDisabled,HandleCloseAlert,AssetData}) {
    const AssetDisplay = () => {
        const  asset = AssetData;
    
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
                    {IconComponent} 
                    <div style={{ marginLeft: '10px',fontSize:'30px', color: '#525C76',}}>
                        <p>{`${asset}`}</p>
                       
                    </div>
                </div>
            </div>
        );
    };
    const assetIconMap: { [key: string]: React.ReactNode } = {
        'BTC': <BitcoinCircleColorful style={{ fontSize: 30 }} />,
        'ETH': <EthwColorful style={{ fontSize: 30 }} />,
      };

      const IconComponent = assetIconMap[AssetData] || <PayCircleFilled style={{ fontSize: 30 }} />;
    
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
                    onClick={ToggleAlert}
                    disabled={IsButtonDisabled}
                >Lock</Button>
                {AlertVisible && (
                    <Alert
                        message="Success Text"
                        description="Liquidation has been done. The contract is terminated."
                        type="success"
                        closable={true}
                        onClose={HandleCloseAlert}
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
    )
}