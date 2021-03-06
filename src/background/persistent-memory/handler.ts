import { Env, Handler, InternalHandler, Message } from "../../common/message";
import { SetPersistentMemoryMsg, GetPersistentMemoryMsg,GetChainIdMsg } from "./messages";
import { PersistentMemoryKeeper } from "./keeper";

export const getHandler: (
  keeper: PersistentMemoryKeeper
) => Handler = keeper => {
  return (env: Env, msg: Message<unknown>) => {
    switch (msg.constructor) {
      case SetPersistentMemoryMsg:
        return handleSetPersistentMemoryMsg(keeper)(
          env,
          msg as SetPersistentMemoryMsg
        );
      case GetPersistentMemoryMsg:
        return keeper.get();
      case GetChainIdMsg :
        return keeper.getChainId();
      default:
        throw new Error("Unknown msg type");
    }
  };
};

const handleSetPersistentMemoryMsg: (
  keeper: PersistentMemoryKeeper
) => InternalHandler<SetPersistentMemoryMsg> = (
  keeper: PersistentMemoryKeeper
) => (_, msg) => {
  keeper.set(msg.data);
  return {
    success: true
  };
};
