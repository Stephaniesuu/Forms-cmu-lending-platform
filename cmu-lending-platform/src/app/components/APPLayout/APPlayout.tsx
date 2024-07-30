'use client';
import React, { useEffect, useState } from 'react';
import { Layout, theme, Menu } from 'antd';
import WalletConnector from '../walletConnector';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Content, Footer } = Layout;



export default function APPLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  //for theme 
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  //for menu active key
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  let pathname = usePathname();
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

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
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '0 0 4px 4px ',
          border: '1px solid #D9D9D9',
          background: '#FFF',
          boxShadow: '5px 5px 10px 0px rgba(136, 150, 163, 0.40), -4px -4px 10px 0px rgba(255, 255, 255, 0.40), 5px 5px 5px 0px #FFF inset, -5px -5px 10px 0px rgba(136, 150, 163, 0.25) inset',
        }}
      >
        <div 
          style={{
            color: 'black',
            fontSize: '36px',
            fontStyle: 'normal',
            fontWeight: 800,
            lineHeight: 'normal',
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: '#000',
          }}>CMU</div>
        <Menu
          theme="light"
          mode="horizontal"
          items={items}
          style={{
            alignItems: 'center',
            justifyItems: 'center',
            flex: 1,
            minWidth: 0,
            margin: '0 24px',
            background: '0%',
          }}
          selectedKeys={selectedKeys}
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
    </Layout >

  );
}








