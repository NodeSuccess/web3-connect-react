import React from "react";
import { render, screen } from "@testing-library/react";
import Web3 from "web3";

import { AccountBar } from "../AccountBar";

describe("AccountBar", () => {
  beforeAll(() => {
    window.web3 = new Web3();
  });

  it("should show 'Connect to a wallet' when not connected to a wallet", () => {
    jest
      .spyOn(require("../../helpers/useAccount"), "useAccount")
      .mockReturnValue({ account: null, checkAccount: jest.fn() });
    jest
      .spyOn(require("../../helpers/useConnectWallet"), "useConnectWallet")
      .mockReturnValue({ connected: false, connect: jest.fn() });

    render(<AccountBar />);

    const connectText = screen.getByText(/Connect to a wallet/i);
    expect(connectText).toBeInTheDocument();
  });

  it("should show correct ETH balance when connected to a wallet", () => {
    jest
      .spyOn(require("../../helpers/useAccount"), "useAccount")
      .mockReturnValue({
        account: {
          address: "0xE6bA1467eB6B30EE316a7886DB8d0786b94CA6Ac",
          balance: "94462715000000000000",
        },
        checkAccount: jest.fn(),
      });
    jest
      .spyOn(require("../../helpers/useConnectWallet"), "useConnectWallet")
      .mockReturnValue({ connected: true, connect: jest.fn() });

    render(<AccountBar />);

    const balanceText = screen.getByText(/94.462 ETH/i);
    expect(balanceText).toBeInTheDocument();
  });
});
