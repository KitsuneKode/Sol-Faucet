//this is wahta the basic airdrop component looks like in the tutorial

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useState } from "react";

const Airdrop = () => {
  const [amount, setAmount] = useState(0);
  const wallet = useWallet();

  const { connection } = useConnection();
  const sendAirdropToUser = async () => {
    await connection.requestAirdrop(
      wallet.publicKey,
      amount * LAMPORTS_PER_SOL
    );
    alert(`Airdrop sent ${amount}`);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="amount"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendAirdropToUser}>Send Airdrop </button>
    </div>
  );
};

export default Airdrop;
