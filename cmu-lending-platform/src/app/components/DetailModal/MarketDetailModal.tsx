'use client';

import { Button, Card, Select } from "antd";
import { useState } from "react";

import { CloseOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';




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


export default function MarketDetailButton() {
  const [showCard, setShowCard] = useState(false);
  return (

    <>
       <Button type="primary" onClick={() => setShowCard(!showCard)}>Detail</Button>
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
                <h1 style={h1Style}>Contract Meta</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                <div>
                 <p style={h2Style}>Contract Address</p>
                 <p style={h2Style}>Counterparty</p>
                 <p style={h2Style}>Days Till Maturity</p>
                 <p style={h2Style}>Status</p>
                 </div>
                 <div style={h3Style}>
                 <p style={h2Style}>0x1234...7890</p>
                 <p style={h2Style}>0xrichard.eth</p>
                 <p style={h2Style}> NULL</p>
                 <p style={h2Style}>Request</p>
                 </div>
              </div>
              </div>
              <div>
                <h1 style={h1Style}>Asset Borrowed</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                <div>
                 <p style={h2Style}>Contract Address</p>
                 <p style={h2Style}>Principal</p>
                 <p style={h2Style}>Withdrawn Balance</p>
  
                 </div>
                 <div style={h3Style}>
                 <p style={h2Style}>NULL</p>
                 <p style={h2Style}>NULL</p>
                 <p style={h2Style}>NULL</p>
          
                 </div>
              </div>
              </div>
              <div>
                <h1 style={h1Style}>Collateral</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                <div>
                 <p style={h2Style}>Contract Address</p>
                 <p style={h2Style}>Locked Balance</p>
                 <p style={h2Style}>Discounted Market Value</p>
                
                 </div>
                 <div style={h3Style}>
                 <p style={h2Style}>0x3456...7890</p>
                 <p style={h2Style}>$ 10,000,000.00</p>
                 <p style={h2Style}>$ 76</p>
               
                 </div>
              </div>
              </div>
              <div style={{marginBottom: '30px'}}>
                <h1 style={h1Style}>Interest</h1>
                <div style={{display: 'flex', gap: '10px'}}>
                <div>
                 <p style={h2Style}>Accured Interest</p>
                
                
                 </div>
                 <div style={h3Style}>
                 <p style={h2Style}>$99,999.99</p>
                 </div>
              </div>
              </div>
              <div style={{
      display: 'flex',       
      justifyContent: 'center' 
    }}>

              <button style={{ width: '180px',
                
                    height: '40px',
                    background: '#C67EFF',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    
                  }}>Create</button>
                </div>
            </div>

          </StyledCard>

        </>
      )}
    </>
  );

}