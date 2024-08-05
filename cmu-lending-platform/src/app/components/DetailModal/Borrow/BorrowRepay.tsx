import { Button, Tooltip } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { BitcoinCircleColorful } from '@ant-design/web3-icons';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function BorrowRepay() {
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
                    <h1 style={IcontextStyle}>Repay</h1>
                </div>
                <h2 style={h2Style} >repay your borrowed coins and get collateral back</h2>
            </header>
            <div style={{ marginTop: '30px' }}>
                <h1 style={h1Style}>Countdown </h1>
                <p style={h2Style}>24 Days</p>
            </div>
            <div style={{ display: 'flex', marginTop: '30px', marginBottom: '10px', }}>
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
                        <Tooltip title="Include 5% interest">
                            <span>Total Amount
                                <div style={{ display: 'inline-block', marginLeft: '5px', }}>
                                    <QuestionCircleOutlined />
                                </div>
                            </span>
                        </Tooltip>
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '41px',
                paddingBottom: '0px',
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
                    }}>Repay</Button>
            </div>
        </div>
    );
}