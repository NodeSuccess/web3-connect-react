import { renderHook } from "@testing-library/react-hooks";

import { useAccount } from "../useAccount";

describe("useAccount", () => {
  const mockAccount = {
    address: "0xE6bA1467eB6B30EE316a7886DB8d0786b94CA6Ac",
    balance: "94462715000000000000",
  };

  beforeAll(() => {
    window.web3 = {
      eth: {
        getAccounts: () => ["0xE6bA1467eB6B30EE316a7886DB8d0786b94CA6Ac"],
        getBalance: () => "94462715000000000000",
      },
    };
  });

  afterAll(() => {
    delete window.web3;
  });

  it("should return a null account when wallet not connected", async () => {
    const { result } = renderHook(() => useAccount(false));

    expect(result.current.account).toEqual(null);
  });

  it("should return a valid account details when wallet connected", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAccount(true));

    await waitForNextUpdate();
    expect(result.current.account).toEqual(mockAccount);
  });
});
