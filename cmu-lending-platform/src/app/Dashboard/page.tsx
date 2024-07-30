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
      multiple: 7,
    },
  },
  {
    title: 'Counterparty',
    dataIndex: 'counterparty',
    sorter: {
      compare: (a, b) => a.counterparty.localeCompare(b.counterparty),
      multiple: 1,
    },
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
      multiple: 8,
    },
  },
  {
    title: 'Value (HKD)',
    dataIndex: 'value',
    sorter: {
      compare: (a, b) => a.value.localeCompare(b.value),
      multiple: 8,
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
      multiple: 9,
    },
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    sorter: {
      compare: (a, b) => a.deadline.localeCompare(b.deadline),
      multiple: 10,
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