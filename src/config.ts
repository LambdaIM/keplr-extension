import React from "react";

import { FiatCurrency } from "./common/currency";
import { BIP44 } from "@chainapsis/cosmosjs/core/bip44";
import { defaultBech32Config } from "@chainapsis/cosmosjs/core/bech32Config";
import { ChainInfo, AccessOrigin } from "./background/chains";

import {
  // COSMOS_REST_CONFIG,
  // COSMOS_REST_ENDPOINT,
  // COSMOS_RPC_CONFIG,
  // COSMOS_RPC_ENDPOINT,
  ETHEREUM_ENDPOINT,
  COSMOS_REST_CONFIG_test,
  COSMOS_REST_ENDPOINT_test,
  COSMOS_RPC_CONFIG_test,
  COSMOS_RPC_ENDPOINT_test,

  COSMOS_REST_CONFIG_main,
  COSMOS_REST_ENDPOINT_main,
  COSMOS_RPC_CONFIG_main,
  COSMOS_RPC_ENDPOINT_main,

  ADDITIONAL_INTL_MESSAGES,
  ADDITIONAL_SIGN_IN_PREPEND
} from "./config.var";
import { IntlMessages } from "./ui/popup/language";

export const CoinGeckoAPIEndPoint = "https://api.coingecko.com/api/v3";
export const CoinGeckoGetPrice = "/simple/price";
export const AutoFetchingFiatValueInterval = 300 * 1000; // 5min

export const AutoFetchingAssetsInterval = 10 * 1000; // 15sec

// Endpoint for Ethereum node.
// This is used for ENS.
export const EthereumEndpoint = ETHEREUM_ENDPOINT;

export const EmbedChainInfos: ChainInfo[] = [
  {
    rpc: COSMOS_RPC_ENDPOINT_main,
    rpcConfig: COSMOS_RPC_CONFIG_main,
    rest: COSMOS_REST_ENDPOINT_main,
    restConfig: COSMOS_REST_CONFIG_main,
    chainId: "lambda-chain-5.1",
    chainName: "Main Net",
    stakeCurrency: {
      coinDenom: "mlamb",
      coinMinimalDenom: "ulamb",
      coinDecimals: 6,
      coinGeckoId: ""
    },
    walletUrl:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/cosmoshub-3/stake"
        : "http://localhost:8081/#/cosmoshub-3/stake",
    walletUrlForStaking:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/cosmoshub-3/stake"
        : "http://localhost:8081/#/cosmoshub-3/stake",
    bip44: new BIP44(44, 364, 0),
    bech32Config: defaultBech32Config("lambda"),
    currencies: [
      {
        coinDenom: "mlamb",
        coinMinimalDenom: "ulamb",
        coinDecimals: 6,
        coinGeckoId: ""
      },
      {
        coinDenom: "tbb",
        coinMinimalDenom: "utbb",
        coinDecimals: 6,
        coinGeckoId: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "mlamb",
        coinMinimalDenom: "ulamb",
        coinDecimals: 6,
        coinGeckoId: ""
      }
    ],
    coinType: 364
  },
  {
    rpc: COSMOS_RPC_ENDPOINT_test,
    rpcConfig: COSMOS_RPC_CONFIG_test,
    rest: COSMOS_REST_ENDPOINT_test,
    restConfig: COSMOS_REST_CONFIG_test,
    chainId: "lambda-chain-test5.3",
    chainName: "Test Net",
    stakeCurrency: {
      coinDenom: "mlamb",
      coinMinimalDenom: "ulamb",
      coinDecimals: 6,
      coinGeckoId: ""
    },
    walletUrl:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/cosmoshub-3/stake"
        : "http://localhost:8081/#/cosmoshub-3/stake",
    walletUrlForStaking:
      process.env.NODE_ENV === "production"
        ? "https://wallet.keplr.app/#/cosmoshub-3/stake"
        : "http://localhost:8081/#/cosmoshub-3/stake",
    bip44: new BIP44(44, 364, 0),
    bech32Config: defaultBech32Config("lambda"),
    currencies: [
      {
        coinDenom: "mlamb",
        coinMinimalDenom: "ulamb",
        coinDecimals: 6,
        coinGeckoId: ""
      },
      {
        coinDenom: "tbb",
        coinMinimalDenom: "utbb",
        coinDecimals: 6,
        coinGeckoId: ""
      }
    ],
    feeCurrencies: [
      {
        coinDenom: "mlamb",
        coinMinimalDenom: "ulamb",
        coinDecimals: 6,
        coinGeckoId: ""
      }
    ],
    coinType: 364
  }
];

/**
 * This declares which origins can access extension without explicit approval.
 */
export const EmbedAccessOrigins: AccessOrigin[] = [
  {
    chainId: "lambda-bdd",
    origins:
      process.env.NODE_ENV === "production" ? ["https://wallet.keplr.app"] : []
  },
  {
    chainId: "kava-3",
    origins:
      process.env.NODE_ENV === "production" ? ["https://wallet.keplr.app"] : []
  },
  {
    chainId: "secret-1",
    origins:
      process.env.NODE_ENV === "production" ? ["https://wallet.keplr.app"] : []
  },
  {
    chainId: "euler-6",
    origins:
      process.env.NODE_ENV === "production" ? ["https://wallet.keplr.app"] : []
  },
  {
    chainId: "straightedge-2",
    origins:
      process.env.NODE_ENV === "production" ? ["https://wallet.keplr.app"] : []
  }
];

export const LanguageToFiatCurrency: {
  [language: string]: FiatCurrency;
} = {
  default: {
    currency: "usd",
    symbol: "$",
    parse: (value: number) => {
      let fractionDigits = 2;
      if (value < 0.01) {
        fractionDigits = 4;
      }
      return value.toLocaleString("en-US", {
        maximumFractionDigits: fractionDigits
      });
    }
  },
  ko: {
    currency: "krw",
    symbol: "￦",
    parse: (value: number) => {
      let fractionDigits = 0;
      if (value < 1) {
        fractionDigits = 1;
      }
      return value.toLocaleString("ko-KR", {
        maximumFractionDigits: fractionDigits
      });
    }
  }
};

export const AdditionalSignInPrepend:
  | React.ReactElement
  | undefined = ADDITIONAL_SIGN_IN_PREPEND;

export const AdditonalIntlMessages: IntlMessages = ADDITIONAL_INTL_MESSAGES;
