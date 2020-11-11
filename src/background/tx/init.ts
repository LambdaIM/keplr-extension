import { MessageManager } from "../../common/message";
import {
  RequestBackgroundTxMsg,
  RequestBackgroundTxWithResultMsg,
  ReqeustSendtokenMsg,
  RequestTxpopcloseMsg
} from "./messages";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";
import { BackgroundTxKeeper } from "./keeper";

export function init(
  messageManager: MessageManager,
  keeper: BackgroundTxKeeper
): void {
  messageManager.registerMessage(RequestBackgroundTxMsg);
  messageManager.registerMessage(RequestBackgroundTxWithResultMsg);
  
  messageManager.registerMessage(ReqeustSendtokenMsg);
  messageManager.registerMessage(RequestTxpopcloseMsg);

  messageManager.addHandler(ROUTE, getHandler(keeper));
}
