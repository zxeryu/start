import { IData, IHandler, IQianKunStateProps } from "./events";
import { isMicroEnv } from "./util";

let callback: IHandler["callback"] | undefined = undefined;

let returnCallback: IHandler["callback"] | undefined = undefined;

const props: IQianKunStateProps = {
  setGlobalState: (data: IData) => {
    callback && callback(data);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    returnCallback && returnCallback(data);
    return true;
  },
  onGlobalStateChange: (cb: IHandler["callback"]) => {
    callback = cb;
  },
};
/**
 * 若是非乾坤环境，将启动
 * @param mount
 */
export const startDev = (mount: (_: any) => {}) => {
  if (!isMicroEnv()) {
    //渲染view
    mount(props);
  }
};

/**
 * 非乾坤环境下模拟事件
 * @param data
 */
export const dispatchGlobalStateDev = (data: IData) => {
  props.setGlobalState(data);
};

export const registerReturnStateListener = (handler: (data: IData) => void) => {
  returnCallback = handler;
};
