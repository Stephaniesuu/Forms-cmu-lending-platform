
'use client';
import React, { useEffect, useState } from 'react';
import { Layout, theme, Menu, Button } from 'antd';
import WalletConnector from '../walletConnector';
import Link from 'next/link';


const { Header, Content, Footer } = Layout;

export default function APPLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  // const [isClient, setIsClient] = useState(false);
  // const items = [
  //   {
  //     key: '1',
  //     label: 'Dashboard',
  //     onClick: () => router.push('/dashboard'),
  //   },
  //   {
  //     key: '2',
  //     label: 'Market',
  //     onClick: () => router.push('/market'),
  //   },
  // ];

  const items = [
    {
      key: '/Dashboard',
      label: <Link href="/Dashboard">Dashboard</Link>
    },
    {
      key: '/Market',
      label: <Link href="/Market">Market</Link>
    }
  ];

  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" style={{ color: 'white', fontSize: 'large', fontFamily: 'monospace' }}>CMU Lending</div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
            margin: '0 24px',
          }}
        />
        <WalletConnector />
      </Header>
      <Content >
        <div
          style={{
            padding: 24,
            minHeight: '100vh',
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        CMU lending platform ©{new Date().getFullYear()} Created by Forms
      </Footer>
    </Layout>

  );
}








