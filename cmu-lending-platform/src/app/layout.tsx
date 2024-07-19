
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";



import { headers } from 'next/headers'
import { cookieToInitialState } from 'wagmi'


import { Providers } from "./providors";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMU Lending platform",
  description: "",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // To do (wagmi)
  // const initialState = cookieToInitialState(
  //   getConfig(),
  //   headers().get('cookie')
  // )
  return (
    <html lang="en" data-theme = 'cupcake'>
      <body className={inter.className}>
        <AntdRegistry>
          <Providers>
          {children}
          </Providers>  
        </AntdRegistry>
      </body>
    </html>
  );
}
