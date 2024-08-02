'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table, Divider, Button, Tag, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { supplies } from './supplies';
import { borrows } from './borrows';
import { contracts } from '../data/contracts';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import BorrowDetailButton from '../components/DetailModal/BorrowDetailModal';
import SupplyDetailButton from '../components/DetailModal/SupplyDetailModal';
import { compareValues, compareDates, formatAddress } from '../components/Table/functions';
import { dashboardTable } from '../components/Table/datatypes';

const columns = (isSupply: boolean): TableColumnsType<dashboardTable> => [
  {
    title: 'Assest',
    dataIndex: 'assest',
    align: 'center',
    filters: [
      { text: 'Bitcoin (BTC)', value: 'BTC' },
      { text: 'Ethereum (ETH)', value: 'ETH' },
      { text: 'Pak Coin (PAK)', value: 'PAK' },
      { text: 'Hei Coin (HEI)', value: 'HEI' },
      { text: 'Jorey Coin (JORE)', value: 'JORE' },
      { text: 'Stephanie Coin (STEP)', value: 'STEP' },
      { text: 'Joyful99 (JOY9)', value: 'JOY' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.assest.indexOf(value) === 0,
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
    key: 'counterparty',
    align: 'center',
    render: (counterparty: string) => formatAddress(counterparty),
    width: '20%',
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
    key: 'status',
    dataIndex: 'status',
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Matured', value: 'Matured' },
      { text: 'Pending', value: 'Pending' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    align: 'center',
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
    align: 'center',
  },
  {
    dataIndex: 'action',
    render: () => isSupply ? <SupplyDetailButton /> : <BorrowDetailButton />,
  },
];

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const containerStyle: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '20px',
  height: '100%',
  borderRadius: '20px',
  boxShadow: '0 3px 5px 0 rgba(0,0,0,0.2)',
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

export default function Dashboard() {
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={containerStyle}>
            <StyledTable
              columns={columns(true)}
              dataSource={supplies}
              onChange={onChange}
              rowClassName={rowClassName}
              scroll={{ y: 1000 }}
              pagination={{ pageSize: 10 }}
              title={() => <Title level={1}>Your supplies</Title>}
            />
          </div>
        </Col>
        <Col className="gutter-row" span={12}>
          <div style={containerStyle}>
            <StyledTable
              columns={columns(false)}
              dataSource={borrows}
              onChange={onChange}
              rowClassName={rowClassName}
              scroll={{ y: 1000 }}
              pagination={{ pageSize: 10 }}
              title={() => <Title level={1}>Your borrows</Title>}
            />
          </div>
        </Col>
      </Row>
    </APPLayout >
  );
}