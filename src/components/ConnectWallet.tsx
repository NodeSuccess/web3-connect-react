import React from "react";
import { Avatar, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as colors from "@material-ui/core/colors";
import Identicon from "identicon.js";

import { Account } from "../helpers/useAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "2.5rem",
    padding: "0.25rem 0.5rem",
    "& *> .caption": {
      paddingRight: "0.5rem",
    },
    borderRadius: "0.5rem",
    color: colors.indigo[800],
    "&.connect": {
      backgroundColor: colors.blue[50],
      "&:hover": {
        backgroundColor: "#fff",
      },
    },
    "&.connected": {
      backgroundColor: "#fff",
    },
    textTransform: "none",
    fontWeight: 800,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transitions: "all 0.3 ease",
  },
  avatar: {
    margin: "0.25rem",
    marginRight: "-0.25rem",
    width: "1.5rem",
    height: "1.5rem",
    border: "1px solid transparent",
  },
}));

export interface ConnectWalletProps {
  account: Account | null;
  connect: () => void;
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({
  account,
  connect,
}) => {
  const styles = useStyles();

  const shortAddress = React.useMemo(() => {
    if (!account || !account.address) {
      return null;
    }
    return `${account.address.slice(0, 6)}...${account.address.slice(
      account.address.length - 4,
      account.address.length
    )}`;
  }, [account]);

  return (
    <Button
      classes={{ root: styles.root }}
      className={account ? "connected" : "connect"}
      onClick={connect}
    >
      {account ? (
        <Typography variant="caption">{shortAddress}</Typography>
      ) : (
        <Typography variant="caption">Connect to a wallet</Typography>
      )}
      {account && (
        <Avatar
          classes={{ root: styles.avatar }}
          src={`data:image/png;base64,${new Identicon(
            account.address,
            30
          ).toString()}`}
          variant="rounded"
        />
      )}
    </Button>
  );
};
