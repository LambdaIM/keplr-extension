import { Message } from "../../common/message";
import { ROUTE } from "./constants";
import {
  ResultBroadcastTx,
  ResultBroadcastTxCommit
} from "@chainapsis/cosmosjs/rpc/tx";

export class RequestBackgroundTxMsg extends Message<{}> {
  public static type() {
    return "request-background-tx";
  }

  /**
   * @param chainId Chain id
   * @param txBytes Hex encoded bytes for tx
   * @param mode Broadcast mode
   */
  constructor(
    public readonly chainId: string,
    public readonly txBytes: string,
    public readonly mode: "sync" | "async" | "commit",
    public readonly isRestAPI: boolean = false
  ) {
    super();
  }

  validateBasic(): void {
    if (!this.chainId) {
      throw new Error("chain id is empty");
    }

    if (!this.txBytes) {
      throw new Error("tx bytes is empty");
    }

    if (
      !this.mode ||
      (this.mode !== "sync" && this.mode !== "async" && this.mode !== "commit")
    ) {
      throw new Error("invalid mode");
    }
  }

  approveExternal(): boolean {
    return true;
  }

  route(): string {
    return ROUTE;
  }

  type(): string {
    return RequestBackgroundTxMsg.type();
  }
}

export class RequestBackgroundTxWithResultMsg extends Message<
  ResultBroadcastTx | ResultBroadcastTxCommit
> {
  public static type() {
    return "request-background-tx-with-result";
  }

  /**
   * @param chainId Chain id
   * @param txBytes Hex encoded bytes for tx
   * @param mode Broadcast mode
   */
  constructor(
    public readonly chainId: string,
    public readonly txBytes: string,
    public readonly mode: "sync" | "async" | "commit",
    public readonly isRestAPI: boolean = false
  ) {
    super();
  }

  validateBasic(): void {
    if (!this.chainId) {
      throw new Error("chain id is empty");
    }

    if (!this.txBytes) {
      throw new Error("tx bytes is empty");
    }

    if (
      !this.mode ||
      (this.mode !== "sync" && this.mode !== "async" && this.mode !== "commit")
    ) {
      throw new Error("invalid mode");
    }
  }

  approveExternal(): boolean {
    return true;
  }

  route(): string {
    return ROUTE;
  }

  type(): string {
    return RequestBackgroundTxWithResultMsg.type();
  }
}


export class ReqeustSendtokenMsg extends Message<void> {
  public static type() {
    return "request-Sendtoken";
  }
/**
 *    recipient,
      denom,
      amount,
      chainId
*/
  constructor(
    public readonly recipient: string,
    public readonly denom: string,
    public readonly amount: string,
    public readonly chainId: string,
  ) {
    super();
  }

  validateBasic(): void {
    if (!this.chainId) {
      throw new Error("chain id is empty");
    }

    if (!this.recipient) {
      throw new Error("Empty recipient");
    }
    if (!this.denom) {
      throw new Error("Empty denom");
    }

    if (!this.amount) {
      throw new Error("Empty denom");
    }
  }
  route(): string {
    return ROUTE;
  }

  type(): string {
    return ReqeustSendtokenMsg.type();
  }

  approveExternal(): boolean {
    return true;
  }
}
