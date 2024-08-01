'use client'
import React, { useState } from 'react';
import { Card, Select, Space } from 'antd';
import APPLayout from '../components/APPLayout/APPlayout';
import { useAccount } from 'wagmi'
import { Row, Col, Typography, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import DetailButton from '../components/DetailModal/SupplyDetailModal';
import '../Market/style.css';
const { Title } = Typography;
// import { Address, NFTCard } from '@ant-design/web3';



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

};

export default function Market() {
  return (
    <APPLayout>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <p> This is for Market</p>
          </div>
        </Col>

        <Col className="gutter-row" span={12}>

          <div style={style}>
            <Title> This is for Market</Title>

          </div>
        </Col>
      </Row>
    </APPLayout>
  );
}