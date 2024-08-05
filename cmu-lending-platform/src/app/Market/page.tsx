'use client'

import React, { useState } from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import type { TableColumnsType, TableProps } from 'antd';
import { filteredMarketData } from '../data/contracts';
import { BitcoinCircleColorful, EthereumFilled, EthwColorful } from '@ant-design/web3-icons';
import { PayCircleFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import MarketDetailButton from '../components/DetailModal/MarketDetailModal';

import { compareValues, compareDates, formatAddress } from '../components/Table/functions';
import { marketTable } from '../components/Table/datatypes';

const columns: TableColumnsType<marketTable> = [
  {
    title: 'Asset',
    dataIndex: 'asset',
    align: 'center',
    // sorter: {
    //   compare: (a, b) => a.assest.localeCompare(b.assest),
    // },
    filters: [
      { text: 'Bitcoin (BTC)', value: 'BTC' },
      { text: 'Ethereum (ETH)', value: 'ETH' },
      { text: 'Pak Coin (PAK)', value: 'PAK' },
      { text: 'Hei Coin (HEI)', value: 'HEI' },
      { text: 'Jorey Coin (JORE)', value: 'JORE' },
      { text: 'Stephanie Coin (STEP)', value: 'STEP' },
      { text: 'Forms Coin (FRMS)', value: 'FRMS' },
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value, record) => record.asset.indexOf(value) === 0,
    defaultSortOrder: 'ascend',
    width: '5%',
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
    title: 'Creditor',
    dataIndex: 'seller',
    align: 'center',
    render: (seller: string) => formatAddress(seller),
    width: '10%',
  },
  {
    title: 'Amount',
    dataIndex: 'assetAmount',
    align: 'center',
    sorter: {
      compare: (a, b) => a.assetAmount - b.assetAmount,
    },
    render: (text, record) => new Intl.NumberFormat('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 }).format(record.assetAmount),
    width: '5%',
  },
  {
    title: 'Value',
    dataIndex: 'assetValue',
    align: 'center',
    sorter: {
      compare: (a, b) => a.assetValue - b.assetValue,
    },
    render: (text, record) => `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(record.assetValue)}`,
    width: '10%',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
    align: 'center',
    sorter: {
      compare: (a, b) => a.repayment.localeCompare(b.repayment),
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
    width: '5%',
  },
  {
    title: 'Value',
    dataIndex: 'repaymentAmount',
    align: 'center',
    sorter: {
      compare: (a, b) => a.repayValue - b.repayValue,
    },
    render: (text, record) => `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(record.repayValue)}`,
    width: '10%',
  },
  {
    title: 'Required Collateral',
    dataIndex: 'originalCollateralValue',
    align: 'center',
    sorter: {
      compare: (a, b) => a.originalCollateralValue - b.originalCollateralValue,
    },
    render: (text, record) => `$ ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(record.originalCollateralValue)}`,
    width: '12%',
  },
  {
    title: 'Duration',
    dataIndex: 'loanDuration',
    align: 'center',
    sorter: {
      compare: (a, b) => a.loanDuration - b.loanDuration,
    },
    render: (text, record) => `${record.loanDuration} Months`,
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
  {
    dataIndex: 'action',
    render: () => <MarketDetailButton />,
    width: '5%',
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




export default function Market() {
  return (
    <APPLayout>
      <div style={tableContainerStyle}>
        <StyledTable
          columns={columns}
          dataSource={filteredMarketData}
          onChange={onChange}
          style={tableStyle}
          rowClassName={rowClassName}
          title={() => <Title level={1}>Market</Title>}
        />
      </div>
    </APPLayout>
  );
}