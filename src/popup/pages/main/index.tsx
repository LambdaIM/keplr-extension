import React from "react";

import { Header } from "./header";
import { AccountInfo } from "./account-info";

import style from "./style.module.scss";

export class MainPage extends React.Component {
  public render() {
    return (
      <div className={style.container}>
        <Header />
        <div className={style.containerAccount}>
          <AccountInfo />
        </div>
        <div className={style.containerTxs} />
      </div>
    );
  }
}