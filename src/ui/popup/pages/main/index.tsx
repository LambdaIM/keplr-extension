import React, { FunctionComponent, useEffect, useRef } from "react";

import { HeaderLayout } from "../../layouts";

import { Card, CardBody } from "reactstrap";

import style from "./style.module.scss";
import { Menu } from "./menu";
import { AccountView } from "./account";
import { TxButtonView } from "./tx-button";
import { AssetView } from "./asset";


import classnames from "classnames";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "../../stores";
import { ChainsKeeper } from "../../../../background/chains/keeper";
import { useConfirm } from "../../../components/confirm";
import { useIntl } from "react-intl";
import manifest from '../../../../manifest.json'
// import { TokensView } from "./token";

export const MainPage: FunctionComponent = observer(() => {
  const history = useHistory();
  const intl = useIntl();

  // const { chainStore, accountStore } = useStore();
  const { chainStore } = useStore();

  const confirm = useConfirm();

  const prevChainId = useRef<string | undefined>();
  var chainiD = chainStore.chainInfo.chainId;
  useEffect(() => {
    if (prevChainId.current !== chainStore.chainInfo.chainId) {
      // FIXME: This will be executed twice on initial because chain store set the chain info on constructor and init.
      (async () => {
        if (await ChainsKeeper.checkChainUpdate(chainStore.chainInfo)) {
          // If chain info has been changed, warning the user wether update the chain or not.
          if (
            await confirm.confirm({
              paragraph: intl.formatMessage({
                id: "main.update-chain.confirm.paragraph"
              }),
              yes: intl.formatMessage({
                id: "main.update-chain.confirm.yes"
              }),
              no: intl.formatMessage({
                id: "main.update-chain.confirm.no"
              })
            })
          ) {
            await chainStore.tryUpdateChain(chainStore.chainInfo.chainId);
          }
        }
      })();
    }

    prevChainId.current = chainStore.chainInfo.chainId;
    chainiD = prevChainId.current
  }, [chainStore, confirm, intl]);

  // const stakeCurrency = chainStore.chainInfo.stakeCurrency;

  // const tokens = accountStore.assets.filter(asset => {
  //   return asset.denom !== stakeCurrency.coinMinimalDenom;
  // });

  // const hasTokens = tokens.length > 0;
  

  return (
    <HeaderLayout
      showChainName
      canChangeChainInfo
      menuRenderer={<Menu />}
      rightRenderer={
        <div
          style={{
            height: "64px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: "20px"
          }}
        >
          <i
            className="fas fa-user"
            style={{
              cursor: "pointer",
              padding: "4px"
            }}
            onClick={e => {
              e.preventDefault();

              history.push("/setting/set-keyring");
            }}
          />
        </div>
      }
    >
      <Card className={classnames(style.card, "shadow")}>
        <CardBody>
          <div className={style.containerAccountInner}>
            <AccountView />
            <AssetView />
            <TxButtonView />
            <div className={classnames(style.chainid)}>
             <span>ChainID :</span> {chainiD}<br/>
             <span>LAMB Wallet :</span>{manifest.version}
            </div>
          </div>
        </CardBody>
      </Card>
{/*       
      {hasTokens ? (
        <Card className={classnames(style.card, "shadow")}>
          <CardBody>
            <TokensView tokens={tokens} />
          </CardBody>
        </Card>
      ) : null} */}
    </HeaderLayout>
  );
});
