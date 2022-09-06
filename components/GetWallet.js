import { useState } from "react";
const { ethers } = require("ethers");
import Web3 from "web3";

const provider = new ethers.providers.Web3Provider(window.ethereum)

const address = "0xdb0bEbB1AD3e8687853735DaFEe6C16404caBB94"

const GetWallet = () => {
  const wal = async () => {
    const balance = await provider.getBalance(address);
    console.log(
      `\nETH Balance of ${address} --> ${ethers.utils.formatEther(
        balance
      )} ETH\n`
    );
  };

  wal();

  return <div>start</div>;

}

export default GetWallet