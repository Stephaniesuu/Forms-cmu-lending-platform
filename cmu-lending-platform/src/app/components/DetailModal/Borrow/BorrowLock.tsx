'use client';
import { renderCoinMiddle } from "../../Table/functions";
import { Button, message, Spin } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { useState } from "react";
import { renderAmount } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";
import { getSymbolByAddress } from '../../../data/coinsPrice';
import { _contractABI } from "../../../../../../web3/abi/LoanContract";

import { sellerLockCollateral } from "../../../../../../web3/scripts/script";

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


export default function BorrowLock({ IsLocked, SetIsLocked, RecordData }: { IsLocked: boolean, SetIsLocked: Function, RecordData: RecordDataType }) {
    const collateral = RecordData.collateral;
    const [loading, setLoading] = useState(false);

    const parseError = (error: any): string => {
        if (error.code === 'ACTION_REJECTED') {
            return 'Transaction was rejected by the user.';
        } else if (error.code === 'CALL_EXCEPTION') {
            return `Lock failed: transaction failed.please check your balance and try again`;
        }
        return 'Lock failed: ' + (error.message);

    };

    const handleBorrowlockClick = async () => {
        setLoading(true);
        try {
            const result = await sellerLockCollateral(RecordData.address);
            if (result) {
                SetIsLocked(true);
                message.success({
                    content: 'Collateral is locked successfully!',
                    duration: 10,
                });
            } else {
                console.error('No data returned from contract function');
                message.error({
                    content: 'Lock failed: No data returned from contract function',
                    duration: 10,
                });
            }
        } catch (error) {
            console.error('Error executing contract function:', error);
            const errorMessage = parseError(error);
            message.error({
                content: errorMessage,
                duration: 10,
            });
        } finally {
            setLoading(false);
        }
    };
    const CollateralDisplay = () => {
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
                    {renderCoinMiddle(getSymbolByAddress(collateral)!)}
                </div>
            </div>
        );
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
                    <h2 style={h2Style} >Lock your current collateral for getting coins</h2>
                </header>
                <div>
                    <CollateralDisplay />
                </div>
                <div>
                    <h1 style={h1Style}>Amount Required</h1>
                    <p style={h2Style}>{renderAmount(RecordData.collateralAmount)}</p>
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
                        onClick={handleBorrowlockClick}
                        disabled={IsLocked}
                    >{IsLocked ? 'Locked' : 'Lock'}</Button>
                </div>
            </Spin>
        </div>
    )
}