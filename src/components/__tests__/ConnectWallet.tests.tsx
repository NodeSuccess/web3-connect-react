import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Web3 from "web3";

import { ConnectWallet } from "../ConnectWallet";

describe("ConnectWallet", () => {
  const mockAccount = {
    address: "0xE6bA1467eB6B30EE316a7886DB8d0786b94CA6Ac",
    balance: "94462715000000000000",
  };

  beforeAll(() => {
    window.web3 = new Web3();
  });

  it("should show 'Connect to a wallet' when not connected to a wallet", () => {
    render(<ConnectWallet account={null} connect={jest.fn()} />);

    const connectText = screen.getByText(/Connect to a wallet/i);
    expect(connectText).toBeInTheDocument();
  });

  it("should show short form wallet address when connected to a wallet", () => {
    render(<ConnectWallet account={mockAccount} connect={jest.fn()} />);

    const connectText = screen.getByText(/0xE6bA...A6Ac/i);
    expect(connectText).toBeInTheDocument();
  });

  it("should call connect when user clicks button", () => {
    const mockConnect = jest.fn();
    const { container } = render(
      <ConnectWallet account={mockAccount} connect={mockConnect} />
    );

    const button = container.querySelector("button");
    expect(button).toBeDefined();

    fireEvent.click(button!);
    expect(mockConnect).toHaveBeenCalledTimes(1);
  });
});
