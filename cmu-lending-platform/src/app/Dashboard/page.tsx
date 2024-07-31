'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { supplies } from './supplies';
import { borrows } from './borrows';

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
    filters: [
      { text: 'Bitcoin (BTC)', value: 'BTC' },
      { text: 'Ethereum (ETH)', value: 'ETH' },
      { text: 'Pak Coin (PAK)', value: 'PAK' },
      { text: 'Hei Coin (HEI)', value: 'HEI' },
      { text: 'Jorey Coin (JORE)', value: 'JORE' },
      { text: 'Stephanie Coin (STEP)', value: 'STEP' },
      { text: 'Joy99 (JOY9)', value: 'JOY' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.assest.indexOf(value) === 0,
    align: 'center',
  },
  {
    title: 'Counterparty',
    dataIndex: 'counterparty',
    sorter: {
      compare: (a, b) => a.counterparty.localeCompare(b.counterparty),
    },
    align: 'center',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: {
      compare: (a, b) => a.amount - b.amount,
    },
    align: 'center',
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Value',
    dataIndex: 'value',
    sorter: {
      compare: (a, b) => compareValues(a.value, b.value),
    },
    align: 'center',
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Status',
    dataIndex: 'status',
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Matured', value: 'Matured' },
      { text: 'Pending', value: 'Pending' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    align: 'center',
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    sorter: {
      compare: (a, b) => compareDates(a.deadline, b.deadline),
    },
    align: 'center',
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

const tableContainerStyle : React.CSSProperties = {
  maxWidth: '1400px',
  margin: '0 auto',
};

export default function CMULending() {
  return (
    <APPLayout>
      <div style = {tableContainerStyle}>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
            <Table
              columns={columns}
              dataSource={supplies}
              onChange={onChange}
              style={tableStyle}
              pagination={{ pageSize: 20 }}
              title={() => <Title level={1}>Your supplies</Title>}
            />
        </Col>
        <Col className="gutter-row" span={12}>
            <Table
              columns={columns}
              dataSource={borrows}
              onChange={onChange}
              style={tableStyle}
              pagination={{ pageSize: 20 }}
              title={() => <Title level={1}>Your borrows</Title>}
            />
        </Col>
      </Row>
      </div>
    </APPLayout>
  );
}