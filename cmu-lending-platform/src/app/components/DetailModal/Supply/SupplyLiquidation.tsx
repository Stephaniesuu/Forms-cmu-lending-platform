import { Button, Tooltip, Alert } from "antd";
import { MoneyCollectOutlined } from '@ant-design/icons';
import { BitcoinCircleColorful } from '@ant-design/web3-icons';


const LiquidateTab = ({ toggleAlert, alertVisible, isButtonDisabled, handleCloseAlert }) => {
    return (
        <div style={{ width: "100%" }}>
            <header>
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
                    <h1 style={{
                        fontSize: '28px',
                        color: '#8247E5',
                        fontntFamily: 'Poppins',
                        marginLeft: '10px',
                    }}>Liquidation</h1>
                </div>
                <h2 style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>All collateral will transfer to your wallet if the repayment is overdue.</h2>
            </header>
            <div>
                <p style={{
                    fontSize: '12px',
                    color: '#525C76',
                    fontntFamily: 'Poppins',
                    marginLeft: '63px',
                }}>Collateral</p>
                <div style={{ display: 'flex', }}>
                    <BitcoinCircleColorful style={{
                        fontSize: 30,
                        marginLeft: '63px',
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
            <div>
                <h1 style={{
                    fontSize: '12px',
                    color: '#525C76',
                    fontntFamily: 'Poppins',
                    marginLeft: '63px',
                }}>Amount </h1>
                <p style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>4.000,000</p>
            </div>
            <div>
                <h1 style={{
                    fontSize: '12px',
                    color: '#525C76',
                    fontntFamily: 'Poppins',
                    marginLeft: '63px',
                }}>Deadline </h1>
                <p style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>24 June 2024</p>
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
    );
};

export default LiquidateTab;
