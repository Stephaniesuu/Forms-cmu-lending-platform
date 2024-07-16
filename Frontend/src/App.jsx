import { useState } from 'react'; 

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Pyro from "./components/pyro/Pyro";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Test Project",
  projectId: "4a2e449fee470b5e7d05feafe3b0ddd8",
  chains: [mainnet, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

function App() {
  const queryClient = new QueryClient();
  const [showPyro, setShowPyro] = useState(false);

  const togglePyro = () => {
    setShowPyro(!showPyro);
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="App flex">
            <Sidebar />
            <div className="flex-grow">
              <Header />
              <main className="p-4">
                <h2>Welcome to the App</h2>
                <p>This is the main content area.</p>
                <button onClick={togglePyro} className="py-2 px-4 bg-blue-500 text-white rounded">
                  {showPyro ? 'Hide Pyro' : 'Show Pyro'}
                </button>
                {showPyro && <Pyro />}
              </main>
            </div>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
