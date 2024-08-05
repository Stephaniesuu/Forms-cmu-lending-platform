import { Alert, Button, message, Select } from "antd";
import { SetStateAction, useState } from "react";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
// import toggleAlert from "../BorrowDetailModal";
// import isButtonDisabled from "../BorrowDetailModal";
// import handleCloseAlert from "../BorrowDetailModal";
// import alertVisible from "../BorrowDetailModal";

export default function BorrowLock(ToggleAlert, AlertVisible, IsButtonDisabled,HandleCloseAlert) {
    // const [showCard, setShowCard] = useState(false);
    // const [activeTabKey, setActiveTabKey] = useState<string>('Lock');
    // const [isBorrow, setIsBorrow] = useState(false);
    // const [alertVisible, setAlertVisible] = useState(false);
    // const onTabChange = (key: React.SetStateAction<string>) => {
    //     setActiveTabKey(key);
    // };
    // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    // const toggleAlert = () => {
    //     setAlertVisible(!alertVisible);
    //     setIsButtonDisabled(true);
    // };
    // const handleCloseAlert = () => {
    //     setAlertVisible(false); // 关闭警告
    //     // 注意这里不重置按钮的禁用状态
    // };
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
                <p style={h1Style}>Collateral</p>
                <Select
                    defaultValue="Select"
                    style={{ width: 120, marginLeft: '63px', marginBottom: '20px' }}
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
                >Liquidation</Button>
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