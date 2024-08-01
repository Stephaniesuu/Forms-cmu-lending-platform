'use client'
import React, { useState } from 'react';
import APPLayout from '../components/APPLayout/APPlayout';
import { Row, Col, Typography, } from 'antd';

const { Title } = Typography;


const style: React.CSSProperties = {
  opacity: 'initial',
  background: 'linear-gradient(to right, #f7f7f7, rgba(255,255,255,0))',
  padding: '12px',
  height: '100%',
  borderRadius: '6px',
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