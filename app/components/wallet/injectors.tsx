import { InjectedConnector } from "@web3-react/injected-connector";
// import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { BscConnector } from "@binance-chain/bsc-connector";

const injected = new InjectedConnector({
  // supportedChainIds: [56] // Mainnet
  supportedChainIds: [97], // Testnet
});

// const walletconnect = new WalletConnectConnector({

// });

const coinbaseWallet = new WalletLinkConnector({
  // url: 'https://bsc-dataseed1.binance.org:443', // Mainnet
  url: 'https://data-seed-prebsc-1-s1.binance.org:8545', // Testnet
  appName: "Block2School",
  // supportedChainIds: [56], // Mainnet
  supportedChainIds: [97], // Testnet
});

// const binanceWallet = new WalletLinkConnector({
//   // url: 'https://bsc-dataseed1.binance.org:443', // Mainnet
//   url: 'https://data-seed-prebsc-1-s1.binance.org:8545', // Testnet
//   appName: "Block2School",
//   // supportedChainIds: [56], // Mainnet
//   supportedChainIds: [97], // Testnet
// });

const binanceWallet = new BscConnector({
  // supportedChainIds: [56], // Mainnet
  supportedChainIds: [97], // Testnet
});

export const connectors = {
  injected: injected,
  coinbaseWallet: coinbaseWallet,
  binanceWallet: binanceWallet,
}
