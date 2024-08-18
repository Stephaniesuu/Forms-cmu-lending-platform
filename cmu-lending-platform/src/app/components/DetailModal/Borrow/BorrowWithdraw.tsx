import { Button, message, Spin } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { renderCoinLarge, renderAmount } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";

import { withdrawLoan } from "../../../../../../web3/scripts/script";

import { getSymbolByAddress } from '../../../data/coinsPrice';
import { useState } from "react";


export default function BorrowWithdraw({ IsWithdraw, SetIsWithdraw, RecordData }: { IsWithdraw: boolean, SetIsWithdraw: Function, RecordData: RecordDataType }) {
    const asset = RecordData.asset;
    const assetAmount = RecordData.assetAmount;
    const [loading, setLoading] = useState(false);

    const parseError = (error: any): string => {
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
            const originalError = error.error?.data?.originalError;
            if (originalError && originalError.message) {
                return `Withdraw failed: ${originalError.message}`;
            }
            return 'Withdraw failed: Unpredictable gas limit. Please check your collateral and try again.';
        }else if (error.code === 'ACTION_REJECTED') {
            return 'Withdraw failed: User rejected the transaction.';
        } else if (error.code === 'CALL_EXCEPTION') {
            return 'Withdraw failed: Transaction failed. Please check your balance and try again.';
        }
        return 'Withdraw failed: An unknown error occurred. Please try again.';
    };

    const handleWithdrawButtonClick = async () => {
        setLoading(true);
        try {
            await withdrawLoan(RecordData.address);
            SetIsWithdraw(true);
            message.success('Withdraw successful');
        } catch (error) {
            console.error('Error executing withdraw:', error);
            const errorMessage = parseError(error);
            message.error(
                {
                    content: errorMessage,
                    duration: 10,
                }
            );
        }
        finally {
            setLoading(false);
        }
    }


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
                        <h1 style={IcontextStyle}>Withdraw</h1>
                    </div>
                    <h2 style={h2Style} >Withdraw your Loan Coin</h2>
                </header>
                <div style={{ marginTop: '30px', }}>
                    <p style={h1Style}>Coin</p>
                    {renderCoinLarge(getSymbolByAddress(asset)!)}
                </div>
                <div style={{ marginTop: '30px', }}>
                    <h1 style={h1Style}>Amount </h1>
                    <p style={h2Style}>{renderAmount(assetAmount)}</p>
                </div>
                <div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '31px',
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
                        }}
                        onClick={handleWithdrawButtonClick}
                        disabled={IsWithdraw}
                    >{IsWithdraw ? 'Withdrew' : 'Withdraw'}</Button>
                </div>
            </Spin>
        </div>
    );
}