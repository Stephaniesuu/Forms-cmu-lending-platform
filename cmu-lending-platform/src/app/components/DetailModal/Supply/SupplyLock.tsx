import { Select, Button, message } from "antd";
import { IcontextStyle, h2Style, h1Style } from "../BorrowDetailModal";

const handleChange = (value: string) => {
    console.log(`selected ${value}`);
};

export default function SupplyLock({ IsLocked, SetIsLocked }: { IsLocked: boolean, SetIsLocked: Function }) {

    const toggleAlert = () => {
        // setLockAlertVisible(!lockAlertVisible);
        SetIsLocked(true);
        message.success('Lock successful');
    };

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
                    }}
                    onClick={toggleAlert}
                    disabled={IsLocked}
                >{IsLocked ? 'Locked' : 'Lock'}</Button>
            </div>
        </div>
    );

}