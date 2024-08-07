'use client';
import {renderCoinLarge, renderCoinMiddle} from "../../Table/functions";
import { Alert, Button, message, Select } from "antd";
import { h1Style, h2Style, IcontextStyle } from "../BorrowDetailModal";
import { useState } from "react";
import { renderCoin } from "../../Table/functions";
import { calculateCoinsNeeded,renderAmount } from "../../Table/functions";
import { RecordDataType } from "../../../data/metadata_interface";


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

    const toggleAlert = () => {
        SetIsLocked(true);
        message.success('Lock successful');
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
                    {renderCoinMiddle(collateral)}
                </div>
            </div>
        );
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
                    <h1 style={IcontextStyle}>Lock</h1>
                </div>
                <h2 style={h2Style} >Lock your current collateral for getting coins</h2>
            </header>
            <div>
                <CollateralDisplay />
            </div>
            <div>
                <h1 style={h1Style}>Amount Required</h1>
                <p style={h2Style}>{renderAmount(calculateCoinsNeeded(RecordData.collateral, RecordData.originalCollateralValue) || 0)}</p>
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
                    onClick={toggleAlert}
                    disabled={IsLocked}
                >{IsLocked ? 'Locked' : 'Lock'}</Button>
            </div>
        </div>
    )
}