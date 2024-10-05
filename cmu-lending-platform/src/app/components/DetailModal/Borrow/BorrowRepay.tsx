'use client';

import { Button, Tooltip, Popconfirm, message, Progress, ProgressProps } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useState } from "react";
import { renderAmount, renderCoinLarge, calculateDateDifference } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";
import { repayLoan } from "../../../../../web3Script/scripts/script";
import { getSymbolByAddress } from '../../../data/coinsPrice';


export default function BorrowRepay({ IsRepay, SetIsRepay, RecordData }: { IsRepay: boolean, SetIsRepay: Function, RecordData: RecordDataType }) {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const daysToRepay = calculateDateDifference(RecordData.deadline);


    const parseError = (error: any): string => {
        if (error.code === 'UNPREDICTABLE_GAS_LIMIT') {
            const originalError = error.error?.data?.originalError;
            if (originalError && originalError.message) {
                return `Repay failed: ${originalError.message}`;
            }
            return 'Repay failed: Unpredictable gas limit. Please check your collateral and try again.';
        } else if (error.code === 'ACTION_REJECTED') {
            return 'Repay failed: User rejected the transaction.';
        } else if (error.code === 'CALL_EXCEPTION') {
            return 'Repay failed: Transaction failed. Please check your balance and try again.';
        }
        return 'Repay failed: An unknown error occurred.';
    };

    const handleRepayComfirm = async () => {
        setConfirmLoading(true);
        try {
            await repayLoan(RecordData.address);
            message.success({
                content:'Repay successful',
                duration: 10,});
        } catch (error) {
            console.error('Error executing repay:', error);
            const errorMessage = parseError(error);
            message.error(
                {
                    content: errorMessage,
                    duration: 10,
                }
            );
        } finally {
            setConfirmLoading(false);
            setOpen(false);
        }
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const conicColors: ProgressProps['strokeColor'] = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#8247E5',
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
                    <h1 style={IcontextStyle}>Repay</h1>
                </div>
                <h2 style={h2Style} >repay your borrowed coins and get collateral back</h2>
            </header>
            {IsRepay ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <div style={{ width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Progress type="circle" percent={100} strokeColor={conicColors} />
                    </div>
                </div>) : (
                <>
                    <div style={{ marginTop: '30px' }}>
                        <h1 style={h1Style}>Countdown </h1>
                        <p style={h2Style}>{calculateDateDifference(RecordData.deadline)}</p>
                    </div>
                    <div style={{ display: 'flex', marginTop: '30px', marginBottom: '10px', }}>
                        <div>
                            <p style={h1Style}>Coin</p>
                            {renderCoinLarge(getSymbolByAddress(RecordData.repayment)!)}
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
                                marginLeft: '63px',
                            }}>
                                {renderAmount(RecordData.repaymentAmount)}
                            </h2>
                        </div>
                    </div>
                </>
            )
            }

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '41px',
                paddingBottom: '0px',
            }}>
                <Popconfirm
                    title="Comfirm to repay?"
                    description={`You still have ${daysToRepay} days to repay`}
                    open={open}
                    onConfirm={handleRepayComfirm}
                    okButtonProps={{ loading: confirmLoading }}
                    onCancel={handleCancel}
                >
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
                        onClick={() => { setOpen(true) }}
                        disabled={IsRepay}>{IsRepay ? 'Repaid' : 'Repay'}</Button>
                </Popconfirm>
            </div>
        </div >
    );
}