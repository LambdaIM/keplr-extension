import { CosmosJSWalletProvider } from "./cosmosjs-wallet-provider";
import { Keplr } from "./common";
import { CosmJSOfflineSigner } from "./cosmjs-offline-signer";

// Give a priority to production build.

if (process.env.NODE_ENV !== "production") {
  if (!window.keplrlamb) {
    window.keplrlamb = new Keplr();
  }

  if (!window.cosmosJSWalletProvider) {
    window.cosmosJSWalletProvider = new CosmosJSWalletProvider();
  }

  if (!window.getOfflineSigner) {
    window.getOfflineSigner = (chainId: string): CosmJSOfflineSigner => {
      return new CosmJSOfflineSigner(chainId);
    };
  }
} else {
  window.keplrlamb = new Keplr();
  window.cosmosJSWalletProvider = new CosmosJSWalletProvider();
  window.getOfflineSigner = (chainId: string): CosmJSOfflineSigner => {
    return new CosmJSOfflineSigner(chainId);
  };
}
