'use client'

import React, { useState, useEffect} from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table,Tag, Alert } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType } from 'antd';
import styled from '@emotion/styled';
import BorrowDetailButton from '../components/DetailModal/BorrowDetailModal';
import SupplyDetailButton from '../components/DetailModal/SupplyDetailModal';
import { compareValues, compareDates, renderAddress, renderAmount, renderCoin, renderCoinLarge } from '../components/Table/functions';
import { useAccount } from 'wagmi';

import { getContractsByBuyer, getContractsBySeller } from '../data/contracts';
import { getSymbolByAddress, getPriceByAddress, renderCoinValue} from '../data/coinsPrice';
import { getStatus } from '../../../../web3/scripts/script';
const columns = (isSupply: boolean): TableColumnsType => [
  {
    title: 'Asset',
    dataIndex: 'asset',
    align: 'center',
    width: '12%',
    filters: [
      { text: renderCoin('BTC'), value: 'BTC' },
      { text: renderCoin('ETH'), value: 'ETH' },
      { text: renderCoin('PAK'), value: 'PAK' },
      { text: renderCoin('HEI'), value: 'HEI' },
      { text: renderCoin('JORE'), value: 'JORE' },
      { text: renderCoin('STEP'), value: 'STEP' },
      { text: renderCoin('ALAN'), value: 'ALAN' },
      { text: renderCoin('FRMS'), value: 'FRMS' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.asset.indexOf(value) === 0,
    render: (asset: string) => {
      const assetName = getSymbolByAddress(asset);
      return renderCoin(assetName || asset); // Fallback to address if name is not found
    },
  },
  {
    title: isSupply ? 'Seller' : 'Buyer',
    dataIndex: isSupply ? 'seller' : 'buyer',
    align: 'center',
    render: renderAddress,
    width: '15%',
  },
  {
    title: 'Amount',
    dataIndex: 'assetAmount',
    sorter: {
      compare: (a, b) => a.assetAmount - b.assetAmount,
    },
    align: 'center',
    render: (text, record) => renderAmount(record.assetAmount),
    sortDirections: ['descend', 'ascend'],
    width: '16%',
  },
  {
    title: 'Value',
    dataIndex: 'assetValue',
    sorter: {
      compare: (a, b) => a.assetValue - b.assetValue,
    },
    align: 'center',
    render: (text, record) => renderCoinValue(record.asset, record.assetAmount),
    sortDirections: ['descend', 'ascend'],
    width: '16%',
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    width: '11%',
    filters: [
      { text: 'Active', value: 'Active' },
      { text: 'Matured', value: 'Matured' },
      { text: 'Pending', value: 'Pending' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    align: 'center',
    render(_, record) {
      const statusColorMap: { [key: string]: string } = {
        'Pending': 'blue',
        'Active': 'green',
        'Matured': 'lightgray',
      };
      const color = statusColorMap[record.status] || 'lightgray';
    
      return (
        <Tag color={color}>{record.status}</Tag>
      );
    }
  },
  {
    title: 'Deadline',
    dataIndex: 'deadline',
    sorter: {
      compare: (a, b) => compareDates(a.deadline, b.deadline),
    },
    align: 'center',
    width: '16%',
    render: (deadline: string) => {
      const date = new Date(deadline);
      const formattedDate = date.toISOString().split('T')[0]; // Extracts the date part
      return formattedDate;
    },
  },
  {
    dataIndex: 'action',
    render: (text, record) => isSupply ? <SupplyDetailButton contract={record} /> : <BorrowDetailButton contract = {record}/>,
  },
];


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

  return (
    <APPLayout>
      {account.isDisconnected ? (
        <>
          <Alert
            message="Error"
            description="You need to connect your wallet to see your dashboard."
            type="error"
            showIcon />
          <br />
        </>
      ) : (
        null
      )
      }
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={containerStyle}>
            <StyledTable
              columns={columns(true)}
              dataSource={getContractsByBuyer(account.address ?? '')}
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
              dataSource={getContractsBySeller(account.address ?? '')}
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