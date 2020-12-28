import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { AccountBar } from "./components/AccountBar";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  main: {
    width: "80vw",
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      textAlign: "center",
    },
  },
  builtByText: {
    position: "absolute",
    bottom: "1rem",
    margin: "0 auto",
  },
}));

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar classes={{ root: styles.toolbar }}>
          <IconButton color="inherit" aria-label="menu" href="/">
            <AttachMoney />
          </IconButton>
          <AccountBar />
        </Toolbar>
      </AppBar>
      <Container classes={{ root: styles.main }}>
        <Typography variant="h4" gutterBottom>
          Web3 Connect
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          An example web app to demonstrate connecting to an Ethereum based
          cryptocurrency wallet using Web3.
        </Typography>
        <br />
        <Typography variant="body1" color="textSecondary" gutterBottom>
          If your browser is supports Web3 then you be prompted by your wallet
          software to connect.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Once accepted as a connected site the app will automatically connect
          to your wallet when subsequent visits.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          In order to remove this app with your wallet, remove the app URL from
          your walllet's connected sites.
        </Typography>
        <Typography classes={{ root: styles.builtByText }} variant="caption">
          <Link href="https://nodesuccess.com">Built by NodeSuccess</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default App;
