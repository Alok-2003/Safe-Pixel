import React from "react";
import { ethers } from "ethers";
import contractAbi from "../constants/contractAbi.json";
import toast from "react-hot-toast";
import axios from "axios";
export const connectWallet = async () => {
  try {
    if (!window.ethereum) {
      throw new Error("MetaMask not installed,Please install It");
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const selectedAccount = accounts[0];

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const message = "Welcome to Crypto Vault Website";
    const signature = await signer.signMessage(message);
    // console.log(signature);
    const dataSignature = {
      signature,
    };
    const url = `http://localhost:3000/api/authentication?address=${selectedAccount}`;
    const res = await axios.post(url, dataSignature);
    const token = res.data.token;
    localStorage.setItem("token",token);

    const contractAddress = "0xBA52f7AC589BaB380603C0433D18c25EA899Ce6D";
    const contractInstance = new ethers.Contract(
      contractAddress,
      contractAbi,
      signer
    );
    return { contractInstance, selectedAccount };
  } catch (error) {
    toast.error("Wallet connection Failed");
    console.error("Error", error);
  }
};
