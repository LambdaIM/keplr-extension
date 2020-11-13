import React from "react";
import { AxiosRequestConfig } from "axios";
import { IntlMessages } from "./ui/popup/language";

export const ETHEREUM_ENDPOINT = "";

export const COSMOS_RPC_ENDPOINT = "http://47.94.197.75:26657";
export const COSMOS_RPC_CONFIG: AxiosRequestConfig | undefined = undefined;
export const COSMOS_REST_ENDPOINT = "http://47.94.197.75:13659";
export const COSMOS_REST_CONFIG: AxiosRequestConfig | undefined = undefined;

export const COSMOS_RPC_ENDPOINT_test = "http://bj1.testnet.lambdastorage.com:26657";
export const COSMOS_RPC_CONFIG_test: AxiosRequestConfig | undefined = undefined;
export const COSMOS_REST_ENDPOINT_test = "http://bj1.testnet.lambdastorage.com:13659";
export const COSMOS_REST_CONFIG_test: AxiosRequestConfig | undefined = undefined;

export const COSMOS_RPC_ENDPOINT_main = "http://39.107.247.86:26657";
export const COSMOS_RPC_CONFIG_main: AxiosRequestConfig | undefined = undefined;
export const COSMOS_REST_ENDPOINT_main = "http://39.107.247.86:13659";
export const COSMOS_REST_CONFIG_main: AxiosRequestConfig | undefined = undefined;


export const ADDITIONAL_SIGN_IN_PREPEND:
  | React.ReactElement
  | undefined = undefined;

export const ADDITIONAL_INTL_MESSAGES: IntlMessages = {};
