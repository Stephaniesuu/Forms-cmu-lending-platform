
import { Tooltip } from "antd";

import { h1Style, h3Style, IcontextStyle } from "../SupplyDetailModal";

import { FileSearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { BitcoinCircleColorful, EthereumCircleColorful } from '@ant-design/web3-icons';




export default function SupplyStatus(contract: any) {
    const text = <p>Liquidation will performed automatically once the value decrease exceeds the margin.</p>;


    return (
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
                    }}>{contract.collateralAmount}</h2>
                </div>
                <div style={{ marginLeft: '63px' }}>
                    <h1 style={h1Style}>
                        {contract.repaymentAmount}
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
    );
}