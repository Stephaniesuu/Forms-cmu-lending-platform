import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";

// for antd theme token
import { ConfigProvider } from "antd";

// for web3 functionality
import { Providers } from "./providors";

export const metadata: Metadata = {
  title: "CMU Lending platform",
  description: "",
};

// Import Google Fonts
const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ['400', '500', '700'] });

// Define the global antd theme token 
const themetoken = {
  token: {
    wireframe: true,
    colorPrimary: "#c67eff",
    colorInfo: "#c67eff",
    colorBgBase: "#f9f9f9",
    borderRadius: 10,
    colorTextBase: "#000000",
    fontFamily: poppins.style.fontFamily,
  },
  components: {
    Layout: {
      headerHeight: 48,
      motionDurationMid: "0.3s",
      algorithm: true,
      headerPadding: "0 20px",
    },
    Menu: {
      // itemColor: 'black',
      itemPaddingInline: '34px',
      fontSize:'16px',
    },
    Button: {
      algorithm: true
    },
    Badge: {
      colorError: "rgba(114, 46, 209, 0.66)"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={poppins.className}>
        <AntdRegistry>
          <ConfigProvider theme={themetoken}>
            <Providers>
              {children}
            </Providers>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
