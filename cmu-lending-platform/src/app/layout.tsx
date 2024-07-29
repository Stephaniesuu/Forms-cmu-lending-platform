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
    "wireframe": true,
    "colorPrimary": "#c67eff",
    "colorInfo": "#c67eff",
    "colorBgBase": "#f9f9f9",
    "borderRadius": 10,
    "colorTextBase": "#000000"
  },
  "components": {
    "Layout": {
      "headerHeight": 56,
      "motionDurationMid": "0.3s",
      "algorithm": true
    },
    "Menu": {
      'itemColor': 'black',
    },
    "Button": {
      "algorithm": true
    },
    "Badge": {
      "colorError": "rgba(114, 46, 209, 0.66)"
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
