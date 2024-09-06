import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Component() {
  const [balance, setBalance] = useState(0);
  const [walletConnected, setWalletConnected] = useState();
  const [transactionSignature, setTransactionSignature] = useState("");
  const [amount, setAmount] = useState(0);
  const { showBalance, setShowBalance } = useState();
  const connection = new Connection("https://api.devnet.solana.com");
  const { connected, publicKey } = useWallet();

  const handleAirdrop = async (amount) => {
    if (!walletConnected) {
      alert("Please connect your wallet first.");
      return;
    }

    if (amount === 0) {
      alert("Please select an amount to request an airdrop.");
      return;
    }

    try {
      const airdropSignature = await connection.requestAirdrop(
        publicKey,
        amount * LAMPORTS_PER_SOL
      );

      alert("Airdrop in progress. Please wait for confirmation.");

      await connection.confirmTransaction({
        airdropSignature,
        commitment: "confirmed",
      });

      alert("Airdrop completed successfully.");
      setTransactionSignature(airdropSignature);
    } catch (e) {
      alert("Airdrop failed. Please try again.", e);
      e.json().then((data) => {
        console.log(data.message);
      });
    }
  };

  useEffect(() => {
    setWalletConnected(connected);
  }, [connected]);

  useEffect(() => {
    if (walletConnected) {
      const fetchBalance = async () => {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      };
      fetchBalance();
    }
    setBalance(0);
  }, [publicKey, walletConnected, showBalance]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0B1120] to-[#0E1B2E] text-white">
      <div className="pb-6">
        <WalletMultiButton className="wallet-adapter-button wallet-adapter-button-trigger"></WalletMultiButton>
      </div>

      <div className="max-w-md w-full px-6 py-8 bg-[#0E1B2E] rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Solana Faucet</h1>
          <p className="text-muted-foreground">
            Get free Solana tokens to test your dApps.
          </p>
          <div>
            <span className="text-2xl font-bold">{balance.toFixed(2)} SOL</span>
            <Button
              className="ml-4 px-6 py-2 rounded-md bg-[#4B6BFF] hover:bg-pink-500 transition-colors"
              onClick={() => setShowBalance(true)}
            >
              Show Balance
            </Button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            className="bg-[#1C2B44] hover:bg-[#233655] rounded-md py-2 px-4 transition-colors"
            onClick={() => setAmount(2)}
          >
            2 SOL
          </button>
          <button
            className="bg-[#1C2B44] hover:bg-[#233655] rounded-md py-2 px-4 transition-colors"
            onClick={() => setAmount(0.5)}
          >
            0.5 SOL
          </button>
          <button
            className="bg-[#1C2B44] hover:bg-[#233655] rounded-md py-2 px-4 transition-colors"
            onClick={() => setAmount(1)}
          >
            1 SOL
          </button>
          <button
            className="bg-[#1C2B44] hover:bg-[#233655] rounded-md py-2 px-4 transition-colors"
            onClick={() => setAmount(2.5)}
          >
            2.5 SOL
          </button>
        </div>
        <div className="mt-8 flex items-center">
          <input
            readOnly
            value={amount + " SOL"}
            className="mr-4 bg-[#1C2B44] border-none rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#4B6BFF]"
            placeholder="Select AirDrop Amount"
          />
          <button
            className="w-full px-4 py-2 rounded-md bg-[#4B6BFF] hover:bg-pink-500 transition-colors"
            onClick={() => handleAirdrop(amount)}
          >
            RequestAirdrop
          </button>
        </div>
        <div className="mt-8">
          <div className="text-center">
            <input
              readOnly
              value={transactionSignature}
              className="bg-[#1C2B44] border-none rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#4B6BFF]"
              placeholder="Transaction Signature"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
