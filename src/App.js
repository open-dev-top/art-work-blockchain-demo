import "./App.css";
import { Header } from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import { NavRoutes } from "./routes/NavRoutes";
import { useData } from "./contexts/DataProvider.js";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { Loader } from "./components/Loader/Loader";
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  sepolia,
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'My RainbowKit App',
  projectId: '2822dd5e7fd40329c4d082807fb2cef9',
  chains: [sepolia, mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  const { loading } = useData();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <div className="App">
            <Header />
            {loading && <Loader />}
            <NavRoutes />
            <ScrollToTop />
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                success: { duration: 1500 },
                error: { duration: 1500 },
              }}
              containerStyle={{
                top: "6rem",
              }}
            />
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
