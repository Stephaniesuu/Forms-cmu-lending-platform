'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { market } from './data';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';


function compareValues(a, b) {
  const parseValue = (value) => {
    const number = parseFloat(value.slice(1, -1));
    const unit = value.slice(-1);
    let multiplier = 1;

    if (unit === 'M') {
      multiplier = 1000;
    } else if (unit === 'K') {
      multiplier = 1;
    }

    return number * multiplier;
  };

  const valueA = parseValue(a);
  const valueB = parseValue(b);

  if (valueA > valueB) return 1;
  if (valueA < valueB) return -1;
  return 0;
}

function compareDates(date1, date2) {
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-').map(Number);
    // Assuming the year is in the format 'yy', convert it to 'yyyy'
    const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust as needed for your use case
    return new Date(fullYear, month - 1, day); // month is 0-indexed in Date
  };

  const dateObj1 = parseDate(date1);
  const dateObj2 = parseDate(date2);

  if (dateObj1 > dateObj2) return 1;
  if (dateObj1 < dateObj2) return -1;
  return 0;
}

interface DataType {
  key: React.Key;
  assest: string,
  creditor: string,
  amount: number,
  amountValue: string,
  repayment: number,
  repaymentValue: string,
  requiredCollateral: string,
  duration: string,
  createDate: string,
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Assest',
    dataIndex: 'assest',
    align: 'center',
    // sorter: {
    //   compare: (a, b) => a.assest.localeCompare(b.assest),
    // },
    filters: [
      { text: 'Bitcoin (BTC)', value: 'BTC' },
      { text: 'Ethereum (ETH)', value: 'ETH' },
      { text: 'Pak Coin (PAK)', value: 'PAK' },
      { text: 'Hei Coin (HEI)', value: 'HEI' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.assest.indexOf(value) === 0,
    defaultSortOrder: 'ascend',
    width: '5%',
  },
  {
    title: 'Creditor',
    dataIndex: 'creditor',
    align: 'center',
    width: '5%',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    align: 'center',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
    width: '5%',
  },
  {
    title: 'Value',
    dataIndex: 'amountValue',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.amountValue, b.amountValue),
    },
    width: '10%',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
    align: 'center',
    sorter: {
      compare: (a, b) => a.repayment - b.repayment,
    },
    width: '5%',
  },
  {
    title: 'Value',
    dataIndex: 'repaymentValue',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.repaymentValue, b.repaymentValue),
    },
    width: '10%',
  },
  {
    title: 'Required Collateral',
    dataIndex: 'requiredCollateral',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.requiredCollateral, b.requiredCollateral),
    },
    width: '12%',
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    align: 'center',
    sorter: {
      compare: (a, b) => a.duration.localeCompare(b.duration),
    },
    width: '8%',
  },
  {
    title: 'Create Date',
    dataIndex: 'createDate',
    align: 'center',
    sorter: {
      compare: (a, b) => compareDates(a.createDate, b.createDate),
    },
    width: '10%',
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const tableStyle: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '20px',
  height: '100%',
  borderRadius: '20px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
  fontFamily: 'Poppins',
};

const tableContainerStyle: React.CSSProperties = {
  maxWidth: '1400px',
  margin: '0 auto',
};

const StyledTable = styled(Table)`
  .table-row-even {
    background-color: #FCF9FF;
  }

  .table-row-odd {
    background-color: #ffffff;
  }
`;

const rowClassName = (record: any, index: number): string => {
  return index % 2 === 0 ? 'table-row-even' : 'table-row-odd';
};

const h2Style = {
  // position: 'fixed',
  fontSize: '16px',
  color: '#0F1D40',
  // fontWeight: 'bold',
  fontntFamily: 'Poppins',
  marginLeft: '63px',
  marginBottom: '20px',
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
  highth: '600px', // Adjust based on your preference
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
const contentList = {
  Lock: (
    <div>
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
        <p style={h1Style}>Collateral</p>
        <Select
          defaultValue="Select"
          style={{ width: 120, marginLeft: '63px', marginBottom: '20px' }}
          onChange={handleChange}
          options={[
            { value: 'Ethereum', label: 'Ethereum' },
            { value: 'BitCoin', label: 'BitCoin' },
            { value: 'PakCoin', label: 'PakCoin' },
            { value: 'HeiCoin', label: 'HeiCoin' },
          ]}
        />
      </div>
      <div>
        <h1 style={h1Style}>Amount Required</h1>
        <p style={h2Style}>To be estimated</p>
      </div>
      <div>
        <h1 style={h1Style}>Remaining time</h1>
        <p style={h2Style}>23 hours 59 minutes</p>
      </div>
      <button style={
        {
          width: '100%',
          height: '40px',
          background: '#C67EFF',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          marginLeft: '63px',
          marginBottom: '45px',
        }

      }>Lock</button>
    </div>
  ),
  Withdraw: (<div>
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
    <div>
      <p style={h1Style}>Coin</p>
      <div style={{ display: 'flex', }}>
        <BitcoinCircleColorful style={{
          fontSize: 30,
          marginLeft: '63px',
          // marginTop: '20px',
          marginRight: '10px',
        }} />
        <div>
          <h1 style={{
            fontSize: '15px',
            color: '#000000',
          }}>BitCoin</h1>
          <h2>BTC</h2>
        </div>
      </div>
    </div>
    <div style={{ marginTop: '20px', }}>
      <h1 style={h1Style}>Amount </h1>
      <p style={h2Style}>4.000,000</p>
    </div>
    <div>
    </div>
    <button style={
      {
        width: '150%',
        height: '40px',
        background: '#C67EFF',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: '63px',
        marginBottom: '45px',
      }

    }>Lock</button>
  </div>
  ),
  Repay: (<div>
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
    <div style={{ marginTop: '20px' }}>
      <h1 style={h1Style}>Countdown </h1>
      <p style={h2Style}>24 Days</p>
    </div>
    <div style={{ display: 'flex', marginBottom: '20px', }}>
      <div>
        <p style={h1Style}>Coin</p>
        <div style={{ display: 'flex', }}>

          <BitcoinCircleColorful style={{
            fontSize: 30,
            marginLeft: '63px',
            // marginTop: '20px',
            marginRight: '10px',
          }} />
          <div>
            <h1 style={{
              fontSize: '15px',
              color: '#000000',
            }}>BitCoin</h1>
            <h2>BTC</h2>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '80px', }}>
        <h1 style={h1Style}>
          Total Amount
        </h1>
        <h2 style={{
          fontSize: '20px',
          color: '#0F1D40',
          marginLeft: '63px',
        }}>4.200,000</h2>

      </div>
    </div>

    <div>
    </div>
    <button style={
      {
        width: '85%',
        height: '40px',
        background: '#C67EFF',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginLeft: '63px',
        marginBottom: '45px',
      }

    }>Lock</button>
  </div>
  ),
};
export default function CMULending() {
  return (
    <APPLayout>
      <div style={tableContainerStyle}>
        <StyledTable
          columns={columns}
          dataSource={market}
          onChange={onChange}
          style={tableStyle}
          rowClassName={rowClassName}
          title={() => <Title level={1}>Market</Title>}
        />
      </div>
    </APPLayout>
  );
}