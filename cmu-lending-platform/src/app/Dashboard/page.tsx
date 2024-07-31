'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
import { Row, Col, Table } from 'antd';
import { Address, NFTCard } from '@ant-design/web3';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { supplies } from './supplies';
import { borrows } from './borrows';
import { Alice } from 'next/font/google';

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
  counterparty: string,
  amount: number,
  value: string,
  status: string,
  deadline: string,
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Assest',
    dataIndex: 'assest',
    sorter: {
      compare: (a, b) => a.assest.localeCompare(b.assest),
    },
  },
  {
    title: 'Counterparty',
    dataIndex: 'counterparty',
    sorter: {
      compare: (a, b) => a.counterparty.localeCompare(b.counterparty),
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Value (HKD)',
    dataIndex: 'value',
    sorter: {
      compare: (a, b) => compareValues(a.value, b.value),
    },
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
    },
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    sorter: {
      compare: (a, b) => compareDates(a.deadline, b.deadline),
    },
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const style: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '12px',
  height: '100%',
  borderRadius: '6px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
  fontFamily: 'Poppins',
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100vh', // Full viewport height
  padding: '20px',
};

export default function CMULending() {
  const account = useAccount();
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Title>Your supplies</Title>
            <Table
              columns={columns}
              dataSource={supplies}
              onChange={onChange}
              pagination={false}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Title>Your borrows</Title>
            <p>{account.address}</p>
            <Table
              columns={columns}
              dataSource={borrows}
              onChange={onChange}
              pagination={false}
            />
          </div>
        </Col>
      </Row>
    </APPLayout>
  );
}