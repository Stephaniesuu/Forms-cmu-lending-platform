import { Button, message, Spin } from "antd";
import { IcontextStyle, h2Style, h1Style } from "../BorrowDetailModal";
import { renderCoin, renderCoinLarge, renderAmount, renderCoinValue } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";

import { getSymbolByAddress } from '../../../data/coinsPrice';
import { buyerLockLoan } from "../../../../../web3Script/scripts/script";
import { useState } from "react";

export default function SupplyLock({ IsLocked, SetIsLocked, contract }: { IsLocked: boolean, SetIsLocked: Function, contract: RecordDataType }) {
    const [loading, setLoading] = useState(false);
    const parseError = (error: any): string => {
        if (error.code === 'ACTION_REJECTED') {
            return 'Transaction was rejected by the user.';
        } else if (error.code === 'CALL_EXCEPTION') {
            return `Lock failed: coins transaction failed.please check your balance and try again`;
        }
        return 'Lock failed: ' + (error.message);

    };
    const handleSupplyLockClick = async () => {
        setLoading(true);
        try {
            await buyerLockLoan(contract.address);
            SetIsLocked(true);
            message.success({
                content: 'Coins are locked successfully!',
                duration: 10,
            });
        } catch (error) {
            console.error('Error executing lock:', error);
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
                    {renderCoinLarge(getSymbolByAddress(contract.asset)!)}
                </div>
                <div style={{ marginTop: '15px' }}>
                    <h1 style={h1Style}>Amount Required</h1>
                    <p style={h2Style}>{renderAmount(contract.assetAmount)}</p>
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
                            marginTop: '15px',
                        }}
                        onClick={handleSupplyLockClick}
                        disabled={IsLocked}
                    >{IsLocked ? 'Locked' : 'Lock'}</Button>
                </div>
            </Spin>
        </div>
    );

}