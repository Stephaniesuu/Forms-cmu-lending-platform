import { Button, Alert, message, Spin } from "antd";
import { MoneyCollectOutlined } from '@ant-design/icons';
import { useState } from "react";
import { renderCoinLarge, renderAmount, renderDate } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";
import { getSymbolByAddress } from '../../../data/coinsPrice';
import { liquidation } from "../../../../../../web3/scripts/script";
export default function SupplyLiquidation({ IsLiquidated, SetIsLiquidated, contract }: { IsLiquidated: boolean, SetIsLiquidated: Function, contract: RecordDataType }) {
    const [alertVisible, setAlertVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = () => {
        setAlertVisible(false);
    };
    const parseError = (error: any): string => {
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
            const originalError = error.error?.data?.originalError;
            if (originalError && originalError.message) {
                return `Liquidtate failed: ${originalError.message}`;
            }
            return 'Liquidtate failed: Unpredictable gas limit. Please check your collateral and try again.';
        } else if (error.code === 'ACTION_REJECTED') {
            return 'Liquidtate failed: User rejected the transaction.';
        } else if (error.code === 'CALL_EXCEPTION') {
            return 'Liquidtate failed: Transaction failed. Please check your balance and try again.';
        }
        return 'Liquidtate failed: The condition to liquidate is not met.';
    };

    const toggleAlert = async () => {
        setLoading(true);
        try {
            await liquidation(contract.address);
            setAlertVisible(true);
            SetIsLiquidated(true);
        } catch (error) {
            console.error('Error executing Liquidtate:', error);
            const errorMessage = parseError(error);
            message.error(
                {
                    content: errorMessage,
                    duration: 10,
                }
            );
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ width: "100%" }}>
            <Spin spinning={loading} tip="Loading...">
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
                    {renderCoinLarge(getSymbolByAddress(contract.collateral)!)}
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
                    }}>{renderDate(contract.deadline)}</p>
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
                            message="Success!"
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
            </Spin>
        </div>
    );
};


