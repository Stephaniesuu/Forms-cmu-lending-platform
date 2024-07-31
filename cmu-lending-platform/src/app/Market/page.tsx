'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { market } from './market';

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
      { text: 'BTC', value: 'BTC' },
      { text: 'ETH', value: 'ETH' },
      { text: 'PAK', value: 'PAK' },
      { text: 'HEI', value: 'HEI' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.assest.indexOf(value) === 0,
    defaultSortOrder: 'ascend',
    width: '5%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
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
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
  },
  {
    title: 'Value',
    dataIndex: 'amountValue',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.amountValue, b.amountValue),
    },
    width: '10%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
    align: 'center',
    sorter: {
      compare: (a, b) => a.repayment - b.repayment,
    },
    width: '5%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
  },
  {
    title: 'Value',
    dataIndex: 'repaymentValue',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.repaymentValue, b.repaymentValue),
    },
    width: '10%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
  },
  {
    title: 'Required Collateral',
    dataIndex: 'requiredCollateral',
    align: 'center',
    sorter: {
      compare: (a, b) => compareValues(a.requiredCollateral, b.requiredCollateral),
    },
    width: '12%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    align: 'center',
    sorter: {
      compare: (a, b) => a.duration.localeCompare(b.duration),
    },
    width: '8%',
    render: (text) =>  <div style={{ textAlign: 'center' }}>{text}</div>,
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

export default function CMULending() {
  return (
    <APPLayout>
      <div style={tableContainerStyle}>
        <Table
          columns={columns}
          dataSource={market}
          onChange={onChange}
          style={tableStyle}
          title={() => <Title level={1}>Market</Title>}
        />
      </div>
    </APPLayout>
  );
}