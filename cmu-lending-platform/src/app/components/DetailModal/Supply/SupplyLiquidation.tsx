import { Button, Tooltip, Alert } from "antd";
import { MoneyCollectOutlined } from '@ant-design/icons';
import { BitcoinCircleColorful } from '@ant-design/web3-icons';
import { useState } from "react";
import { renderCoin, renderCoinLarge, renderAmount, renderCoinValue, getCoinValue } from "../../Table/functions";


export default function SupplyLiquidation({ IsLiquidated, SetIsLiquidated, contract }: { IsLiquidated: boolean, SetIsLiquidated: Function, contract: any }) {

    const [alertVisible, setAlertVisible] = useState(false);
    const handleCloseAlert = () => {
        setAlertVisible(false); // 关闭警告
    };

    const toggleAlert = () => {
        setAlertVisible(!alertVisible);
        SetIsLiquidated(true);
    };
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
                        marginLeft: '10px',
                    }}>Liquidation</h1>
                </div>
                <h2 style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>All collateral will transfer to your wallet if the repayment is overdue or margin is met.</h2>
            </header>
            <div>
                <p style={{
                    fontSize: '12px',
                    color: '#525C76',
                    marginLeft: '63px',
                }}>Collateral</p>
                {renderCoinLarge(contract.collateral)}
            </div>
            <div>
                <h1 style={{
                    fontSize: '12px',
                    color: '#525C76',
                    marginLeft: '63px',
                }}>Amount </h1>
                <p style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>{renderAmount(contract.collateralAmount)}</p>
            </div>
            <div>
                <h1 style={{
                    fontSize: '12px',
                    color: '#525C76',
                    marginLeft: '63px',
                }}>Deadline </h1>
                <p style={{
                    fontSize: '16px',
                    marginLeft: '63px',
                    marginBottom: '20px',
                    marginRight: '63px',
                }}>{contract.deadline}</p>
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
                    disabled={IsLiquidated}
                >{IsLiquidated ? 'Liquidated' : 'Liquidate'}</Button>
                {alertVisible && (
                    <Alert
                        showIcon
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


