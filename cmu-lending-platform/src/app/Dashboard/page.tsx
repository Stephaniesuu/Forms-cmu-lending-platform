'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table, Divider, Button, Tag, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { supplies } from './supplies';
import { borrows } from './borrows';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

function compareValues(a: string, b: string) {
  const parseValue = (value: string) => {
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

function compareDates(date1: string, date2: string) {
  const parseDate = (dateStr: string) => {
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
    render(assest: string) {
      const assetIconMap: { [key: string]: React.ReactNode } = {
        'BTC': <BitcoinCircleColorful style={{ fontSize: 20 }} />,
        'ETH': <EthwColorful style={{ fontSize: 20 }} />,
      };
      const IconComponent = assetIconMap[assest] || <PayCircleFilled style={{ fontSize: 20 }} />;
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {IconComponent}
          <span style={{ marginLeft: 8 }}>{assest}</span>
        </div>
      )
    },
  },
  {
    title: 'Counterparty',
    dataIndex: 'counterparty',
    sorter: {
      compare: (a, b) => a.counterparty.localeCompare(b.counterparty),
    },
    render: (counterparty: string) => <a>{counterparty}</a>,
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
    key: 'status',
    dataIndex: 'status',
    sorter: {
      compare: (a, b) => a.status.localeCompare(b.status),
    },
    render(status: string) {
      const statusColorMap: { [key: string]: string } = {
        'Pending': 'blue',
        'Active': 'green',
        'Matured': 'lightgray',
      };
      const color = statusColorMap[status] || 'lightgray';
      return (
        <>
          <Tag color={color}>{status}</Tag>
        </>
      );
    },
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    sorter: {
      compare: (a, b) => compareDates(a.deadline, b.deadline),
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => <Button size='small' >Details</Button>,
  }
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const style: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '20px',
  height: '100%',
  borderRadius: '20px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
};

// const containerStyle = {
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   flexDirection: 'column',
//   height: '100vh', // Full viewport height
//   padding: '20px',
// };
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

export default function CMULending() {
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Title>Your supplies</Title>
            <Divider />
            <StyledTable
              columns={columns}
              dataSource={supplies}
              onChange={onChange}
              pagination={false}
              scroll={{ y: 600 }}
              rowClassName={rowClassName}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Title>Your borrows</Title>
            <Divider />
            <StyledTable
              columns={columns}
              dataSource={borrows}
              onChange={onChange}
              pagination={false}
              scroll={{ y: 600 }}
              rowClassName={rowClassName}
            />
          </div>
        </Col>
      </Row>
    </APPLayout>
  );
}