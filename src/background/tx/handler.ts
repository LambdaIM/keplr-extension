import { Env, Handler, InternalHandler, Message } from "../../common/message";
import {
  RequestBackgroundTxMsg,
  RequestBackgroundTxWithResultMsg,
  ReqeustSendtokenMsg
} from "./messages";
import { BackgroundTxKeeper } from "./keeper";

export const getHandler: (keeper: BackgroundTxKeeper) => Handler = (
  keeper: BackgroundTxKeeper
) => {
  return (env: Env, msg: Message<unknown>) => {
    switch (msg.constructor) {
      case RequestBackgroundTxMsg:
        return handleRequestBackgroundTxMsg(keeper)(
          env,
          msg as RequestBackgroundTxMsg
        );
      case RequestBackgroundTxWithResultMsg:
        return handleRequestBackgroundTxWithResultMsg(keeper)(
          env,
          msg as RequestBackgroundTxWithResultMsg
        );
      case ReqeustSendtokenMsg:
          return handleRequestSendTokenMsg(keeper)(env, msg as ReqeustSendtokenMsg);
      default:
        throw new Error("Unknown msg type");
    }
  };
};

const handleRequestBackgroundTxMsg: (
  keeper: BackgroundTxKeeper
) => InternalHandler<RequestBackgroundTxMsg> = keeper => {
  return async (env, msg) => {
    await keeper.checkAccessOrigin(
      env.extensionBaseURL,
      msg.chainId,
      msg.origin
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await keeper.requestTx(msg.chainId, msg.txBytes, msg.mode!, msg.isRestAPI, msg.uniqueNumber);
    return {};
  };
};

const handleRequestBackgroundTxWithResultMsg: (
  keeper: BackgroundTxKeeper
) => InternalHandler<RequestBackgroundTxWithResultMsg> = keeper => {
  return async (env, msg) => {
    await keeper.checkAccessOrigin(
      env.extensionBaseURL,
      msg.chainId,
      msg.origin
    );
    return await keeper.requestTxWithResult(
      msg.chainId,
      msg.txBytes,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      msg.mode!,
      msg.isRestAPI
    );
  };
};


const handleRequestSendTokenMsg: (
  keeper: BackgroundTxKeeper
) => InternalHandler<ReqeustSendtokenMsg> = keeper => {
  return async (env, msg) => {
    console.log('handleRequestSendTokenMsg')
   return await keeper.requestSendToken(env.extensionBaseURL, 
       msg.chainId,msg.recipient, msg.amount,msg.denom,msg.memo);
  };
};
