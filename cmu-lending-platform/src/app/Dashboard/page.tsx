'use client'

import React from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table, Divider, Button, Tag, Space, Tooltip } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import BorrowDetailButton from '../components/DetailModal/BorrowDetailModal';
import SupplyDetailButton from '../components/DetailModal/SupplyDetailModal';
import { compareValues, compareDates, formatAddress } from '../components/Table/functions';
import { dashboardTable } from '../components/Table/datatypes';
import { useAccount } from 'wagmi';

import { getContractsByBuyer, getContractsBySeller } from '../data/contracts';
import { contracts } from '../data/contracts';
import { get } from 'http';

const columns = (isSupply: boolean): TableColumnsType<dashboardTable> => [
  {
    title: 'Asset',
    dataIndex: 'asset',
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
    onFilter: (value, record) => record.asset.indexOf(value) === 0,
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
    title: isSupply ? 'Seller' : 'Buyer',
    dataIndex: isSupply ? 'seller' : 'buyer',
    align: 'center',
    render: (value: string) => (
      <Tooltip title={value}>
        <span>{formatAddress(value)}</span>
      </Tooltip>
    ),
    width: '15%',
  },
  {
    title: 'Amount',
    dataIndex: 'assetAmount',
    sorter: {
      compare: (a, b) => a.assetAmount - b.assetAmount,
    },
    align: 'center',
    render: (text, record) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(record.assetAmount),
    sortDirections: ['descend', 'ascend'],
    width: '15%',
  },
  {
    title: 'Value',
    dataIndex: 'assetValue',
    sorter: {
      compare: (a, b) => a.assetValue - b.assetValue,
    },
    align: 'center',
    render: (text, record) => `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(record.assetValue)}`,
    sortDirections: ['descend', 'ascend'],
    width: '20%',
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
    render: (text, record) => isSupply ? 
    <SupplyDetailButton assetData={record.asset} /> : 
    <BorrowDetailButton assetData={record.asset} />,
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
  const account = useAccount();
  console.log(account.address)
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={containerStyle}>
            <StyledTable
              columns={columns(true)}
              dataSource={getContractsByBuyer(account.address)}
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
              dataSource={getContractsBySeller(account.address)}
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