import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import {
  AddressInput,
  FeeButtons,
  CoinInput,
  MemoInput
} from "../../../components/form";
import { useStore } from "../../stores";

import { HeaderLayout } from "../../layouts";

import { PopupWalletProvider } from "../../wallet-provider";

import { AccAddress } from "@chainapsis/cosmosjs/common/address";

import { observer } from "mobx-react";

import { useCosmosJS } from "../../../hooks";
import { TxBuilderConfig } from "@chainapsis/cosmosjs/core/txBuilder";

import style from "./style.module.scss";
import { useNotification } from "../../../components/notification";

import { useIntl } from "react-intl";
import { Button } from "reactstrap";

import { useTxState, withTxStateProvider } from "../../../contexts/tx";
import { useHistory,useRouteMatch } from "react-router";

// import { sendMessage } from "../../../../common/message";
// import { BACKGROUND_PORT } from "../../../../common/message/constant";

// import {
//   ReqeustGetBackgroundMsg
// } from "../../../../background/chains/messages";


export const SendtxPage: FunctionComponent = withTxStateProvider(
  observer(() => {
    console.log('send')
    const history = useHistory();
    const matchPara = useRouteMatch<{
      hexdata: string;
    }>();
    

    const intl = useIntl();

    const notification = useNotification();

    const { chainStore, accountStore } = useStore();
    const [walletProvider] = useState(
      new PopupWalletProvider(undefined, {
        onRequestSignature: (id: string) => {
          history.push(`/sign/${id}`);
        }
      })
    );
    const cosmosJS = useCosmosJS(chainStore.chainInfo, walletProvider, {
      useBackgroundTx: true
    });

    const [gasForSendMsg, setGasForSendMsg] = useState(80000);

    const txState = useTxState();
    
    console.log(matchPara)
    var bufdata =Buffer.from(matchPara.params.hexdata,'hex').toString();
    var jsondata = JSON.parse(bufdata); 
    var uniqueNumber = jsondata.uniqueNumber;
    console.log(jsondata)
    // const msg = new ReqeustGetBackgroundMsg('keyinfo');
    //  sendMessage(BACKGROUND_PORT, msg)
    //  .then((data)=>{
    //    console.log(data)

    //  });
    

    useEffect(() => {
      if (txState.amount?.denom) {
        // Remember that the coin's actual denom should start with "type:contractAddress:" if it is for the token based on contract.
        const split = txState.amount.denom
          .split(/(\w+):(\w+):(\w+)/)
          .filter(Boolean);
        if (split.length == 3) {
          // If token based on the contract.
          switch (split[0]) {
            case "cw20":
              setGasForSendMsg(250000);
              break;
            default:
              setGasForSendMsg(80000);
          }
        } else {
          setGasForSendMsg(80000);
        }
      }
    }, [txState.amount?.denom]);

    useEffect(() => {
      txState.setBalances(accountStore.assets);
    }, [accountStore.assets, txState]);

    const memorizedCurrencies = useMemo(() => chainStore.chainInfo.currencies, [
      chainStore.chainInfo.currencies
    ]);
    const memorizedFeeCurrencies = useMemo(
      () => chainStore.chainInfo.feeCurrencies,
      [chainStore.chainInfo.feeCurrencies]
    );

    useEffect(() => {
      txState.setCurrencies(memorizedCurrencies);
      txState.setFeeCurrencies(memorizedFeeCurrencies);
    }, [memorizedCurrencies, memorizedFeeCurrencies, txState]);

    useEffect(() => {
      txState.setGas(gasForSendMsg);
    }, [gasForSendMsg, txState]);

    useEffect(() => {
      txState.setDefaultAmount(jsondata.amount);

    }, [txState,jsondata,memorizedCurrencies])

    useEffect(() => {
      txState.setRawAddress(jsondata.recipient)  
      txState.setMemo(jsondata.memo)
    }, [txState,jsondata,memorizedCurrencies])

    // Cyber chain (eular-6) doesn't require the fees to send tx.
    // So, don't need to show the fee input.
    // This is temporary hardcoding.
    const isCyberNetwork = /^(euler-)(\d)+/.test(chainStore.chainInfo.chainId);
    const txStateIsValid = isCyberNetwork
      ? txState.isValid("recipient", "amount", "memo", "gas")
      : txState.isValid("recipient", "amount", "memo", "fees", "gas");

    return (
      <HeaderLayout
        showChainName
        canChangeChainInfo={false}
        onBackButton={() => {
          history.goBack();
        }}
      >
        <form
          className={style.formContainer}
          onSubmit={async e => {
            if (cosmosJS.sendMsgs && txStateIsValid) {
              e.preventDefault();

              const msg = await txState.generateSendMsg(
                AccAddress.fromBech32(
                  accountStore.bech32Address,
                  chainStore.chainInfo.bech32Config.bech32PrefixAccAddr
                )
              );

              const config: TxBuilderConfig = {
                gas: txState.gas,
                memo: txState.memo,
                fee: txState.fees
              };

              await cosmosJS.sendMsgs(
                [msg],
                config,
                () => {
                  history.replace("/");
                },
                e => {
                  history.replace("/");
                  notification.push({
                    type: "danger",
                    content: e.toString(),
                    duration: 5,
                    canDelete: true,
                    placement: "top-center",
                    transition: {
                      duration: 0.25
                    }
                  });
                },
                "commit",
                uniqueNumber
              );
            }
          }}
        >
          <div className={style.formInnerContainer}>
            <div>
              <AddressInput
                label={intl.formatMessage({ id: "send.input.recipient" })}
                disableAddressBook={true}
                disableAddress={true}
                bech32Prefix={
                  chainStore.chainInfo.bech32Config.bech32PrefixAccAddr
                }
                coinType={chainStore.chainInfo.coinType}
                errorTexts={{
                  invalidBech32Address: intl.formatMessage({
                    id: "send.input.recipient.error.invalid"
                  }),
                  invalidENSName: intl.formatMessage({
                    id: "send.input.recipient.error.ens-invalid-name"
                  }),
                  ensNameNotFound: intl.formatMessage({
                    id: "send.input.recipient.error.ens-not-found"
                  }),
                  ensUnsupported: intl.formatMessage({
                    id: "send.input.recipient.error.ens-not-supported"
                  }),
                  ensUnknownError: intl.formatMessage({
                    id: "sned.input.recipient.error.ens-unknown-error"
                  })
                }}
                
              />
              <CoinInput
                label={intl.formatMessage({ id: "send.input.amount" })}
                disableAllBalance = {true}
                disableAll = {true}
                balanceText={intl.formatMessage({
                  id: "send.input-button.balance"
                })}
                errorTexts={{
                  insufficient: intl.formatMessage({
                    id: "send.input.amount.error.insufficient"
                  })
                }}
              />
              <MemoInput
                label={intl.formatMessage({ id: "send.input.memo" })}
                disableAll={true}
              />
              {isCyberNetwork ? null : (
                <FeeButtons
                  label={intl.formatMessage({ id: "send.input.fee" })}
                  feeSelectLabels={{
                    low: intl.formatMessage({ id: "fee-buttons.select.low" }),
                    average: intl.formatMessage({
                      id: "fee-buttons.select.average"
                    }),
                    high: intl.formatMessage({ id: "fee-buttons.select.high" })
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1 }} />
            <Button
              type="submit"
              color="primary"
              block
              data-loading={cosmosJS.loading}
              disabled={cosmosJS.sendMsgs == null || !txStateIsValid}
            >
              {intl.formatMessage({
                id: "send.button.send"
              })}
            </Button>
          </div>
        </form>
      </HeaderLayout>
    );
  })
);
