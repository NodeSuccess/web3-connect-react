import React from "react";
import {
  AppBar,
  Container,
  IconButton,
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
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    "& > *": {
      textAlign: "center",
    },
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
        <Typography variant="h5" gutterBottom>
          Demonstrates basic wallet connectivity
        </Typography>
        <Typography variant="caption">Built by NodeSuccess</Typography>
      </Container>
    </div>
  );
};

export default App;
