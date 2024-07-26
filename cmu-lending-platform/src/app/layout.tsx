import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";

// for antd theme token
import { ConfigProvider, Menu } from "antd";

// for web3 functionality
import { Providers } from "./providors";

export const metadata: Metadata = {
  title: "CMU Lending platform",
  description: "",
};


const inter = Inter({ subsets: ["latin"] });

const themetoken = {
  "token": {
    "colorPrimary": "#4fcbda",
    "colorInfo": "#4fcbda",
    "colorSuccess": "#81e74f",
    "colorWarning": "#ffda6e",
    "borderRadius": 8,
    "wireframe": false,
    "sizeStep": 5,
    "fontSize": 14,
  },
  "components": {
    "Layout": {
      "algorithm": true,
      "headerHeight": 56,
      "motionDurationMid": "0.3s"
    },
    "Menu": {
      'itemColor': 'black',
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme='light'>
      <body className={inter.className}>
        <AntdRegistry>
          <ConfigProvider theme={themetoken}>
            <Providers>
              {children}
            </Providers>
          </ConfigProvider>
        </AntdRegistry>
      </body >
    </html >
  );
}
