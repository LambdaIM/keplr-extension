import React, {
  FunctionComponent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { HeaderLayout } from "../../../layouts/header-layout";

import style from "../style.module.scss";
import { useHistory } from "react-router";
import { observer } from "mobx-react";
import { useStore } from "../../../stores";
import { AccessOrigin } from "../../../../../background/chains";
import { PageButton } from "../page-button";
import {
  GetAccessOriginMsg,
  RemoveAccessOriginMsg
} from "../../../../../background/chains/messages";
import { sendMessage } from "../../../../../common/message/send";
import { BACKGROUND_PORT } from "../../../../../common/message/constant";
import {
  ButtonDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";

import styleConnections from "./style.module.scss";
import { useIntl } from "react-intl";
import { useConfirm } from "../../../../components/confirm";

export const SettingConnectionsPage: FunctionComponent = observer(() => {
  const history = useHistory();
  const intl = useIntl();

  const { chainStore } = useStore();

  const [accessOrigin, setAccessOrigin] = useState<AccessOrigin | undefined>();
  const [refreshAccessOrigin, setRefreshAccessOrigin] = useState(false);
  const forceRefreshAccessOrigin = useCallback(() => {
    setRefreshAccessOrigin(!refreshAccessOrigin);
  }, [refreshAccessOrigin]);

  useEffect(() => {
    setAccessOrigin(undefined);
    (async () => {
      const msg = new GetAccessOriginMsg(chainStore.chainInfo.chainId);
      const result = await sendMessage(BACKGROUND_PORT, msg);
      setAccessOrigin(result);
    })();
  }, [chainStore.chainInfo.chainId, refreshAccessOrigin]);

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const confirm = useConfirm();

  const removeAccessOriginCallback = useCallback(
    (e: MouseEvent) => {
      const chainId = e.currentTarget.getAttribute("data-chain-id");
      const origin = e.currentTarget.getAttribute("data-origin");

      if (!chainId || !origin) {
        throw new Error("Empty chain id or origin");
      }

      (async () => {
        if (
          await confirm.confirm({
            img: (
              <img
                src={require("../../../public/assets/img/broken-link.svg")}
                style={{ height: "80px" }}
              />
            ),
            title: intl.formatMessage({
              id: "setting.connections.confirm.delete-connection.title"
            }),
            paragraph: intl.formatMessage({
              id: "setting.connections.confirm.delete-connection.paragraph"
            })
          })
        ) {
          const msg = new RemoveAccessOriginMsg(chainId, origin);
          await sendMessage(BACKGROUND_PORT, msg);
          forceRefreshAccessOrigin();
        }
      })();
    },
    [confirm, forceRefreshAccessOrigin, intl]
  );

  const xIcon = useMemo(
    () => [<i key="remove" className="fas fa-times" />],
    []
  );

  return (
    <HeaderLayout
      showChainName={false}
      canChangeChainInfo={false}
      alternativeTitle={intl.formatMessage({
        id: "setting.connections"
      })}
      onBackButton={useCallback(() => {
        history.goBack();
      }, [history])}
    >
      <div className={style.container}>
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          className={styleConnections.dropdown}
        >
          <DropdownToggle caret style={{ boxShadow: "none" }}>
            {chainStore.chainInfo.chainName}
          </DropdownToggle>
          <DropdownMenu>
            {chainStore.chainList.map(chainInfo => {
              return (
                <DropdownItem
                  key={chainInfo.chainId}
                  onClick={useCallback(() => {
                    chainStore.setChain(chainInfo.chainId);
                  }, [chainInfo.chainId])}
                >
                  {chainInfo.chainName}
                </DropdownItem>
              );
            })}
          </DropdownMenu>
        </ButtonDropdown>
        {accessOrigin
          ? accessOrigin.origins.map(origin => {
              return (
                <PageButton
                  title={origin}
                  key={origin}
                  data-chain-id={accessOrigin?.chainId}
                  data-origin={origin}
                  onClick={removeAccessOriginCallback}
                  icons={xIcon}
                />
              );
            })
          : null}
      </div>
    </HeaderLayout>
  );
});
