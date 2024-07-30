
'use client';
import React, { useEffect, useState } from 'react';
import { Layout, theme, Menu } from 'antd';
import WalletConnector from '../walletConnector';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

const { Header, Content, Footer } = Layout;



export default function APPLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  let  pathname  = usePathname();
  useEffect(() => {
    setSelectedKeys([pathname]);
  }, [pathname]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          height: '48px',
          alignItems: 'center',
          background: 'var(--surface-theme_light-surface_0, #FFF)',
          borderBottom: '1px solid var(--surface-theme_light-border_0, #E5E5E5)',
          borderRadius: '0 0 16px 16px ',
          border: '1px solid #EFEFEF',
          boxShadow: '5px 5px 10px 0px rgba(136, 150, 163, 0.40), -4px -4px 10px 0px rgba(255, 255, 255, 0.40), 5px 5px 5px 0px #FFF inset, -5px -5px 10px 0px rgba(136, 150, 163, 0.25) inset',
        }}
      >
        <div className="demo-logo" style={{ color: 'black', fontSize: 'large', fontFamily: 'monospace' }}>CMU Lending</div>
        <Menu
          theme="light"
          mode="horizontal"
          items={items}
          style={{
            alignItems: 'center',
            justifyItems: 'center',
            flex: 1,
            minWidth: 0,
            height: '48px',
            margin: '0 24px',
            fontFamily: 'Poppins',
            background: '3%', 
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








