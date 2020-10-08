import { indexOf, forEach, map, get, set } from "lodash";

export interface IData {
  name: string;
  params?: object;
  from?: "father" | "child";
}

export interface IQianKunStateProps {
  setGlobalState: (_: IData) => boolean;
  onGlobalStateChange: (callback: (data: IData) => void, fireImmediately?: boolean) => void;
}

export interface IHandler {
  callback: (_: IData) => void;
  name: string;
}

let setGlobalState: IQianKunStateProps["setGlobalState"] | undefined = undefined;

const handlers: {
  [_: string]: IHandler[];
} = {};
/**
 * dispatch没有发送的消息视为未消费
 */
const unConsumeData: {
  [_: string]: IData;
} = {};

const registerListener = (type: string, callback: IHandler["callback"], name: IHandler["name"]) => {
  if (!type || !callback) {
    throw new Error("register events need type and callback");
  }
  if (!handlers[type]) {
    handlers[type] = [];
  }
  handlers[type].push({ callback, name });
};

const removeListener = (type: string, callback: IHandler["callback"]) => {
  if (!type || !callback) {
    throw new Error("remove events need type and callback");
  }
  if (!handlers[type]) {
    return;
  }
  const index = indexOf(
    map(handlers[type], ({ callback }) => callback),
    callback,
  );
  if (index > -1) {
    handlers[type].splice(index, 1);
  }
};

const dispatch = (type: string, data: IData) => {
  if (data.from !== "father") {
    return;
  }
  let isConsume = false;
  forEach(handlers[type], ({ callback, name }) => {
    isConsume = true;
    if (name === get(data, "name")) {
      callback(data);
    }
  });
  if (!isConsume) {
    set(unConsumeData, get(data, "name"), data);
  }
};

const GlobalStateType = "GlobalStateType";

export const registerFatherStateListener = (callback: IHandler["callback"], name: IHandler["name"]) => {
  registerListener(GlobalStateType, callback, name);
  //如果存在未消费的同类信息，在绑定成功是即触发一次
  const unConsumeEvent = get(unConsumeData, name, null);
  if (unConsumeEvent) {
    callback(unConsumeEvent);
    delete unConsumeData[name];
  }
};

export const removeFatherStateListener = (callback: IHandler["callback"]) => {
  removeListener(GlobalStateType, callback);
};

/**
 * @param data
 * {
 *    name:string
 *    params:object
 * }
 */
const dispatchGlobalState = (data: IData) => {
  setTimeout(() => {
    if (get(data, "params") === undefined) {
      data.params = {};
    }
    setGlobalState && setGlobalState(data);
  }, 0);
};

export const sendStateToFather = (data: IData) => {
  data.from = "child";
  dispatchGlobalState(data);
};

const handleStateChange = (value: IData) => {
  console.log("@@@@@@@@@@@@@@@ child global", value);
  dispatch(GlobalStateType, value);
};

export const mountEvents = (props: IQianKunStateProps) => {
  setGlobalState = props.setGlobalState;
  props.onGlobalStateChange && props.onGlobalStateChange(handleStateChange);
};

export const unmountEvents = () => {
  setGlobalState = undefined;
};
