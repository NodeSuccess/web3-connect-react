import React from "react";

export interface Account {
  address: string;
  balance: string;
}

export interface UseAccount {
  account: Account | null;
  checkAccount: () => void;
}

export const useAccount = (
  connected: boolean,
  refreshInterval = 5000
): UseAccount => {
  const [account, setAccount] = React.useState<Account | null>(null);

  const getAddress = async () => {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
  };

  const getAccounBalance = async (address: string) => {
    return await window.web3.eth.getBalance(address);
  };

  const checkAccount = React.useCallback(async () => {
    if (!connected) {
      setAccount(null);
      return;
    }
    const address = await getAddress();
    const balance = await getAccounBalance(address);
    setAccount({ address, balance });
  }, [connected]);

  React.useEffect(() => {
    checkAccount();
  }, [connected, checkAccount]);

  return { account, checkAccount };
};
