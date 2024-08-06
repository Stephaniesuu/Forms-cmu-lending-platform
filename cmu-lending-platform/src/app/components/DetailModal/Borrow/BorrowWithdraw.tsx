import { Button, message } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { BitcoinCircleColorful } from '@ant-design/web3-icons';
import { useState } from "react";
import { renderCoinLarge,renderAmount } from "../../Table/functions";


export default function BorrowWithdraw({IsWithdraw, SetIsWithdraw,RecordData}: {IsWithdraw: boolean, SetIsWithdraw: Function, RecordData: object}) {    
    const asset = RecordData.asset;
    const assetAmount = RecordData.assetAmount;
    
    const handleWithdrawButtonClick = () => {
        SetIsWithdraw(true);
        message.success('Withdraw successful');
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
                    <h1 style={IcontextStyle}>Withdraw</h1>
                </div>
                <h2 style={h2Style} >Withdraw your Loan Coin</h2>
            </header>
            <div style={{ marginTop: '30px', }}>
                <p style={h1Style}>Coin</p>
                {renderCoinLarge(asset)}
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
                    >Withdraw</Button>
            </div>
        </div>
    );
}