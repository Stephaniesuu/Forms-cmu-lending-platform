
import React from 'react';
import { Layout, theme, Menu, Button } from 'antd';

import WalletConnector from '../walletConnector';
const { Header, Content, Footer } = Layout;
import { useState } from 'react';


export default function APPLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = [new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }))];

  const [ isBlack, setIsBlack ] = useState('dark');
  const toggleTheme = () => {
    setIsBlack(isBlack === 'dark' ? 'light' : 'dark');
  }
  
  return (
    <Layout>
      <Header style={{ alignItems:'center'}}>
        <div className="logo" />
        <div className='flex'>
          <div className='logo text-white mr-6 text-center items-center'>CMU Lending</div>
          <Menu 
            theme={isBlack}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={items.flat()}
          />
          <div className='flex ml-auto items-center'>
            <WalletConnector />
            <div className='mr-0 ml-2'>
            <Button onClick={toggleTheme}>change Theme</Button>
            </div>
          </div>
        </div>
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








