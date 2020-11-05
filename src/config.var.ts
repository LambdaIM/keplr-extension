import React from "react";
import { AxiosRequestConfig } from "axios";
import { IntlMessages } from "./ui/popup/language";

export const ETHEREUM_ENDPOINT = "";

export const COSMOS_RPC_ENDPOINT = "http://47.94.197.75:26657";
export const COSMOS_RPC_CONFIG: AxiosRequestConfig | undefined = undefined;
export const COSMOS_REST_ENDPOINT = "http://47.94.197.75:13659";
export const COSMOS_REST_CONFIG: AxiosRequestConfig | undefined = undefined;

export const KAVA_RPC_ENDPOINT = "";
export const KAVA_RPC_CONFIG: AxiosRequestConfig | undefined = undefined;
export const KAVA_REST_ENDPOINT = "";
export const KAVA_REST_CONFIG: AxiosRequestConfig | undefined = undefined;


export const ADDITIONAL_SIGN_IN_PREPEND:
  | React.ReactElement
  | undefined = undefined;

export const ADDITIONAL_INTL_MESSAGES: IntlMessages = {};
