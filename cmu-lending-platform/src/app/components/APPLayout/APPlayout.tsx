
import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';


import Navbar from './Header';
const {  Content, Footer } = Layout;

export default function APPLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items = new Array(3).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
  }));
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '0 48px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          style={{
            padding: 24,
            minHeight: 380,
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








