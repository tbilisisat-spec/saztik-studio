/**
 * USDT-TRC20 payment configuration.
 * Wallet address comes from env; fallback is the studio Tron address.
 */
export const USDT_TRC20_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
export const TRON_NETWORK = "TRON (TRC20)";

export function receivingWallet(): string {
  return (
    process.env.USDT_TRON_WALLET?.trim() ||
    "TAfL2w65MYVmzpjsFVSssu85XgLocv7C2o"
  );
}

/** Trust Wallet deep-link helper (opens send screen when possible). */
export function trustWalletSendUrl(address: string, amount: string): string {
  // Trust Wallet universal link for Tron USDT
  const params = new URLSearchParams({
    coin: "195", // Tron coin type in Trust Wallet
    address,
    amount,
    token: USDT_TRC20_CONTRACT,
  });
  return `https://link.trustwallet.com/send?${params.toString()}`;
}

export function tronscanTxUrl(txHash: string): string {
  return `https://tronscan.org/#/transaction/${txHash}`;
}

export function tronscanAddressUrl(address: string): string {
  return `https://tronscan.org/#/address/${address}`;
}
