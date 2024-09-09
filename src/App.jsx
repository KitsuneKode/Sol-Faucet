import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UnsafeBurnerWalletAdapter } from "@solana/wallet-adapter-wallets";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

import "./App.css";
// import Airdrop from "./components/Airdrop";
import AirdropToWallet from "./components/AirdropToWallet";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <>
      <ConnectionProvider
        endpoint={
          "https://solana-devnet.g.alchemy.com/v2/7ZqHHHCbJtNgLU6XWFl4mUjLbwkyPenB"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <AirdropToWallet />
            <Analytics />
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </>
  );
}

export default App;
