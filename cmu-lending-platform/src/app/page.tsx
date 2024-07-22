'use client'
import { Button } from "antd";
import { AntDesignOutlined } from '@ant-design/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="app">
        <Button type = "primary" shape="round" size="large" icon={<AntDesignOutlined />}href="/CMULending">👉 CMU Lending</Button>
      </div>
    </main>
  );
}
