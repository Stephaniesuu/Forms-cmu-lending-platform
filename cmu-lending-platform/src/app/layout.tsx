
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import '@rainbow-me/rainbowkit/styles.css';
import "./globals.css";


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
  return (
    <html lang="en">
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
