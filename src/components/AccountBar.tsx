import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import { ConnectWallet } from "./ConnectWallet";
import { useAccount } from "../helpers/useAccount";
import { useConnectWallet } from "../helpers/useConnectWallet";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "2.5rem",
    borderRadius: "0.5rem",
    color: colors.indigo[800],
    "&.connect": {
      backgroundColor: colors.blue[50],
      "&:hover": {
        backgroundColor: colors.blueGrey[100],
      },
    },
    "&.connected": {
      backgroundColor: colors.blueGrey[100],
      padding: "0 0 0 0.5rem",
      "& > span": {
        paddingRight: "0.5rem",
        fontWeight: "bold",
      },
    },
    textTransform: "none",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transitions: "all 0.3 ease",
  },
}));

export const AccountBar: React.FC = () => {
  const styles = useStyles();

  const { connected, connect } = useConnectWallet();
  const { account } = useAccount(connected);

  const balance = React.useMemo(() => {
    if (!account || !account.balance) {
      return null;
    }
    return window.web3.utils.fromWei(account.balance, "Ether").slice(0, 6);
  }, [account]);

  return (
    <Paper
      classes={{ root: styles.root }}
      className={account ? "connected" : "connect"}
      elevation={3}
    >
      {account && <Typography variant="caption">{`${balance} ETH`}</Typography>}
      <ConnectWallet account={account} connect={connect} />
    </Paper>
  );
};
