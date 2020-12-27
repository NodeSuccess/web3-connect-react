import React from "react";
import Web3 from "web3";

export interface UseConnectWallet {
  connected: boolean;
  connect: () => void;
}

export const useConnectWallet = (): UseConnectWallet => {
  const [connected, setConnected] = React.useState<boolean>(false);

  const checkConnected = (accounts: string[]) => {
    if (!accounts.length) {
      setConnected(false);
    }
  };

  const handleConnect = () => {
    setConnected(true);

    window.ethereum.on("accountsChanged", checkConnected);
  };

  const handleError = () => {
    setConnected(false);
  };

  const connect = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        throw new Error("Browser does not support Ethereum");
      }
      handleConnect();
    } catch (e) {
      handleError();
    }
  };

  React.useEffect(() => {
    connect();

    return () => {
      window.ethereum.off("accountsChanged", checkConnected);
    };
  }, []);

  return { connected, connect };
};
