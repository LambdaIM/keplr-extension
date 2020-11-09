import { MessageManager } from "../../common/message";
import { GetPersistentMemoryMsg, SetPersistentMemoryMsg,GetChainIdMsg } from "./messages";
import { ROUTE } from "./constants";
import { getHandler } from "./handler";
import { PersistentMemoryKeeper } from "./keeper";

export function init(
  messageManager: MessageManager,
  keeper: PersistentMemoryKeeper
) {
  messageManager.registerMessage(SetPersistentMemoryMsg);
  messageManager.registerMessage(GetPersistentMemoryMsg);

  messageManager.registerMessage(GetChainIdMsg);

  messageManager.addHandler(ROUTE, getHandler(keeper));
}
