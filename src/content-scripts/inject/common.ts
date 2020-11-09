import { SuggestingChainInfo } from "../../background/chains";
import {
  ReqeustAccessMsg,
  SuggestChainInfoMsg,
  ReqeustGetBackgroundMsg
} from "../../background/chains/messages";
import { sendMessage } from "../../common/message/send";
import { BACKGROUND_PORT } from "../../common/message/constant";
import {
  RequestBackgroundTxMsg,
  RequestBackgroundTxWithResultMsg,
  ReqeustSendtokenMsg,
} from "../../background/tx";
import {
  ResultBroadcastTx,
  ResultBroadcastTxCommit
} from "@chainapsis/cosmosjs/rpc/tx";
import { EnableKeyRingMsg, KeyRingStatus } from "../../background/keyring";

import { GetChainIdMsg } from "../../background/persistent-memory";

const Buffer = require("buffer/").Buffer;





export class Keplr {
  async experimentalSuggestChain(chainInfo: SuggestingChainInfo) {
    const msg = new SuggestChainInfoMsg(chainInfo, true);
    await sendMessage(BACKGROUND_PORT, msg);
  }

  async enable(chainId: string) {
    const random = new Uint8Array(4);
    crypto.getRandomValues(random);
    const id = Buffer.from(random).toString("hex");

    await sendMessage(
      BACKGROUND_PORT,
      new ReqeustAccessMsg(id, chainId, window.location.origin)
    );

    const msg = new EnableKeyRingMsg(chainId);
    const result = await sendMessage(BACKGROUND_PORT, msg);
    if (result.status !== KeyRingStatus.UNLOCKED) {
      throw new Error("Keyring not unlocked");
    }
  }

  async requestTx(
    chainId: string,
    txBytes: Uint8Array,
    mode: "sync" | "async" | "commit"
  ): Promise<void> {
    const msg = new RequestBackgroundTxMsg(
      chainId,
      Buffer.from(txBytes).toString("hex"),
      mode
    );
    await sendMessage(BACKGROUND_PORT, msg);
  }

  async requestTxWithResult(
    chainId: string,
    txBytes: Uint8Array,
    mode: "sync" | "async" | "commit"
  ): Promise<ResultBroadcastTx | ResultBroadcastTxCommit> {
    const msg = new RequestBackgroundTxWithResultMsg(
      chainId,
      Buffer.from(txBytes).toString("hex"),
      mode
    );
    return await sendMessage(BACKGROUND_PORT, msg);
  }

  async sendToken(recipient: any,denom:  any,amount: any,memo:any,chainId: any){
    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    const msg = new ReqeustSendtokenMsg(
      recipient,
      denom,
      amount,
      memo,
      chainId
    );

    var result = await sendMessage(BACKGROUND_PORT, msg);
    return result
  }
  
  async getAccountbalance(address:string,chainId:string){
    const msg = new ReqeustGetBackgroundMsg(`/auth/accounts/${address}`,chainId);
    return await sendMessage(BACKGROUND_PORT, msg)
     

  }

  async getChainId(): Promise<any>{
    console.log('getChainId')
    const msg = new GetChainIdMsg();
    var result = await sendMessage(BACKGROUND_PORT, msg);
    return result ;
  }

}
