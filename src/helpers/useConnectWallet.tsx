import React from "react";
import Web3 from "web3";

export interface UseConnectWallet {
  connected: boolean;
  connect: () => void;
}

export const useConnectWallet = (): UseConnectWallet => {
  const [connected, setConnected] = React.useState<boolean>(false);

  const checkAccountConnected = (accounts: string[]) => {
    if (!accounts.length) {
      setConnected(false);
    }
  };

  const connect = React.useCallback(async () => {
    const handleConnect = () => {
      setConnected(true);

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", checkAccountConnected);
      }
    };

    const handleError = () => {
      setConnected(false);
    };

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
  }, []);

  React.useEffect(() => {
    connect();

    return () => {
      if (window.ethereum) {
        window.ethereum.off("accountsChanged", checkAccountConnected);
      }
    };
  }, [connect]);

  return { connected, connect };
};
