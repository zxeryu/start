import { initGlobalState } from "qiankun";
import { indexOf, forEach, isEmpty, get, map } from "lodash";

const { onGlobalStateChange, setGlobalState } = initGlobalState();

export interface IData {
  name: string;
  params?: object;
}

export interface IHandler {
  callback: (_: IData) => void;
  name?: string;
}

export type TEventType = "GlobalState" | "BeforeLoad" | "BeforeMount" | "AfterMount" | "BeforeUnmount" | "AfterUnmount";

const handlers: {
  [_: string]: IHandler[];
} = {};

export const registerListener = (type: TEventType, callback: IHandler["callback"], name?: IHandler["name"]) => {
  if (!type || !callback) {
    throw new Error("register events need type and callback");
  }
  if (!handlers[type]) {
    handlers[type] = [];
  }
  handlers[type].push({ callback, name });
};

export const removeListener = (type: TEventType, callback: IHandler["callback"]) => {
  if (!type || !callback) {
    throw new Error("remove events need type and callback");
  }
  if (!handlers[type]) {
    return;
  }
  const index = indexOf(
    map(handlers[type], (handler) => handler.callback),
    callback,
  );
  if (index > -1) {
    handlers[type].splice(index, 1);
  }
};

export const dispatch = (type: TEventType, data: IData) => {
  forEach(handlers[type], ({ callback, name }) => {
    if (!isEmpty(name)) {
      if (name === get(data, "name")) {
        callback(data);
      }
      return;
    }
    callback(data);
  });
};

onGlobalStateChange((value, _) => {
  dispatch("GlobalState", value as IData);
});

export const registerGlobalStateListener = (callback: IHandler["callback"], name?: IHandler["name"]) => {
  registerListener("GlobalState", callback, name);
};

export const removeGlobalStateListener = (callback: IHandler["callback"]) => {
  removeListener("GlobalState", callback);
};

export const dispatchGlobalState = (data: IData) => {
  if (isEmpty(get(data, "name"))) {
    throw new Error('data must have "name"');
  }
  setGlobalState(data);
};
