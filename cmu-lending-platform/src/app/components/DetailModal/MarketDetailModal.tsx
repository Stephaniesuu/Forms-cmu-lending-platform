'use client';

import { Button, Card, Select } from "antd";
import { useState } from "react";

import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import CreateSuccessResult from "./CreateSucessModal";
import { contracts } from "../../data/contracts";
import { Tooltip } from 'antd';
import { renderAddress, getFullName, renderLoanDuration, renderCoinValue, renderAmount, renderValue } from "../Table/functions";
const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};


const h1Style = {
  // position: 'fixed',
  fontSize: '24px',
  color: '#000000',
  fontntFamily: 'Poppins',
  marginLeft: '15px',
  fontWeight: 'bold',
};

const h2Style = {
  // position: 'fixed',
  fontSize: '20px',
  fontntFamily: 'Poppins',
  marginLeft: '15px',
  // marginBottom: '15px',
};
const h3Style = {
  fontSize: '20px',
  fontntFamily: 'Poppins',
  // marginright: '60px',
  marginLeft: 'auto',
  textAlign: 'right',

  marginBottom: '15px',
};
const IcontextStyle = {
  // position: 'fixed',
  fontSize: '28px',
  color: '#8247E5',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '10px',
};

const modalStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000, // High z-index to make sure it is on top
  width: '651px', // Adjust based on your preference
  height: 'auto',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '40px',
};

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 999, // Just below the modal
};

const StyledCard = styled(Card)`
  .ant-tabs-nav-wrap {
    justify-content: center;
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* High z-index to make sure it is on top */
  width: 651px; /* Adjust based on your preference */
  height: 700px; /* Adjust based on your preference */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 40px;
  radius: 16px;
`;

export default function MarketDetailButton({contract}) {
  const [showCard, setShowCard] = useState(false);
  const [showCreateResult, setShowCreateResult] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const handleCreateButtonClick = (params) => {
    // 处理点击事件的逻辑
    console.log('Create button clicked');
    setShowCreateResult(true);
    setIsCreated(true);
  };
  return (

    <>
      <Button type="primary" onClick={() => setShowCard(!showCard)}>Details</Button>
      {showCard && (
        <>
          <div style={backdropStyle} onClick={() => setShowCard(false)}></div>
          <StyledCard
            style={modalStyle}
            title={
              <>
                <Button
                  type="text"
                  icon={<CloseOutlined />}
                  onClick={() => setShowCard(false)}
                  style={{ border: 'none', boxShadow: 'none', position: 'absolute', right: 20, top: 20 }}
                />
              </>
            }
          >
            <div style={{
              // display: 'flex',
              gap: '100px',
              // background: 'rgba(234, 72, 92, 0.05)',
              borderRadius: '16px',
            }}>
              <div>
                <h1 style={h1Style}>Contract Metadata</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>
                    <p style={h2Style}>Contract Address</p>
                    <p style={h2Style}>Seller</p>
                    <p style={h2Style}>Create Date</p>
                    <p style={h2Style}>Status</p>
                  </div>
                  <div style={h3Style}>
                    <p>{contract.address}</p>
                    <p>{renderAddress(contract.seller)}</p>
                    <p>{contract.createDate}</p>
                    <p>{contract.status}</p>
                  </div>
                </div>
              </div>
              <div>
                <h1 style={h1Style}>Assets</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>
                    <p style={h2Style}>Coin</p>
                    <p style={h2Style}>Amount</p>
                    <p style={h2Style}>Current Value</p>
                    <p style={h2Style}>Loan Duration</p>

                  </div>
                  <div style={h3Style}>
                    <p style={h2Style}>{getFullName(contract.asset)}</p>
                    <p style={h2Style}>{renderAmount(contract.assetAmount)}</p>
                    <p style={h2Style}>{renderCoinValue(contract.asset, contract.assetAmount)}</p>
                    <p style={h2Style}>{renderLoanDuration(null,{ loanDuration: contract.loanDuration })}</p>

                  </div>
                </div>
              </div>
              <div>
                <h1 style={h1Style}>Repayment</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>
                    <p style={h2Style}>Coin</p>
                    <p style={h2Style}>Amount</p>
                    <p style={h2Style}>Current Value</p>
                    <p style={h2Style}>Interest</p>

                  </div>
                  <div style={h3Style}>
                    <p style={h2Style}>{getFullName(contract.repayment)}</p>
                    <p style={h2Style}>{renderAmount(contract.repaymentAmount)}</p>
                    <p style={h2Style}>{renderCoinValue(contract.repayment, contract.repaymentAmount)}</p>
                    <p style={h2Style}>{contract.margin}%</p>

                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '30px' }}>
                <h1 style={h1Style}>Collateral</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>
                    <p style={h2Style}>Required Value</p>


                  </div>
                  <div style={h3Style}>
                    <p style={h2Style}>{renderValue(contract.originalCollateralValue)}</p>
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',        // 启用 Flexbox
                justifyContent: 'center' // 水平居中
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
                  }} onClick={() => handleCreateButtonClick({})} disabled={isCreated}>{isCreated ? 'Created' : 'Create'}</Button>
              </div>
            </div>
            <CreateSuccessResult visible={showCreateResult} onClose={() => setShowCreateResult(false)} contractaddress={"0xdbf325102952018AE2412"} />
          </StyledCard>
        </>
      )
      }
    </>
  );

}
