import { renderHook } from "@testing-library/react-hooks";
import Web3 from "web3";

import { useConnectWallet } from "../useConnectWallet";

jest.mock("web3");

describe("useConnectWallet", () => {
  afterEach(() => {
    delete window.ethereum;
    delete window.web3;
  });

  it("should return connected false if browser unsupported", async () => {
    const { result } = renderHook(() => useConnectWallet());

    expect(result.current.connected).toEqual(false);
    expect(Web3).toHaveBeenCalledTimes(0);
  });

  it("should return connected true if web3 available", async () => {
    const mockCurrentProvider = {};
    window.web3 = { currentProvider: mockCurrentProvider };

    const { result } = renderHook(() => useConnectWallet());

    expect(result.current.connected).toEqual(true);
    expect(Web3).toHaveBeenCalledWith(mockCurrentProvider);
  });

  it("should return connected true if ethereum provider available", async () => {
    const mockEnable = jest.fn();
    const mockEthereumProvider = {
      enable: mockEnable,
      on: jest.fn(),
      off: jest.fn(),
    };
    window.ethereum = mockEthereumProvider;

    const { result, waitForNextUpdate } = renderHook(() => useConnectWallet());

    await waitForNextUpdate();
    expect(result.current.connected).toEqual(true);
    expect(Web3).toHaveBeenCalledWith(mockEthereumProvider);
  });
});
