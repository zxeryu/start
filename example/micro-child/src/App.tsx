import React, { useEffect, useState } from "react";
import {
  dispatchGlobalState,
  IData,
  registerGlobalStateListener,
  removeGlobalStateListener,
} from "@bridge-start/micro-front-child";

export const ReceiveDemo = () => {
  const [init, setInit] = useState<IData["params"]>();
  useEffect(() => {
    const handleInitParams = (data: IData) => {
      setInit(data.params);
    };
    registerGlobalStateListener(handleInitParams, "init");
    return () => {
      removeGlobalStateListener(handleInitParams);
    };
  }, []);
  return (
    <div>
      <p>接收到Father init参数:</p>
      <p>{JSON.stringify(init)}</p>
    </div>
  );
};

export const InteractDemo = () => {
  const [login, setLogin] = useState<IData["params"]>();
  useEffect(() => {
    const handleLoginParams = (data: IData) => {
      setLogin(data.params);
    };
    registerGlobalStateListener(handleLoginParams, "login");
    return () => {
      removeGlobalStateListener(handleLoginParams);
    };
  }, []);
  return (
    <div>
      <p>
        与Father互动{" "}
        <button
          onClick={() => {
            dispatchGlobalState({ name: "login-request" });
          }}>
          获取登录信息
        </button>
      </p>
      {login && <p>接受到登录信息：{JSON.stringify(login)}</p>}
    </div>
  );
};

export const App = () => {
  return (
    <div style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
      Child content
      <ReceiveDemo />
      <InteractDemo />
    </div>
  );
};
