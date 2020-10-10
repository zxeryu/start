import React, { useEffect, useState } from "react";
import {
  sendStateToChild,
  registerChildStateListener,
  registerListener,
  removeChildStateListener,
  removeListener,
  IDataApp,
} from "@bridge-start/micro-front-father";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const LoadingState = () => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const handleLoading = (app: IDataApp) => {
      setLoading(app.loading);
    };
    registerListener("Loading", handleLoading);
    return () => {
      removeListener("Loading", handleLoading);
    };
  }, []);
  return <div>{loading !== undefined && loading ? "加载中..." : "加载完成"}</div>;
};

const SendWhileMount = () => {
  useEffect(() => {
    const handleMount = () => {
      sendStateToChild({ name: "init", params: { name: "zx", from: "father" } });
    };
    registerListener("AfterMount", handleMount);
    return () => {
      removeListener("AfterMount", handleMount);
    };
  }, []);
  return null;
};

const FeedbackDemo = () => {
  useEffect(() => {
    const handle = () => {
      sendStateToChild({
        name: "login",
        params: { token: `token${new Date().getTime()}`, from: "father" },
      });
    };
    registerChildStateListener(handle, "login-request");
    return () => {
      removeChildStateListener(handle);
    };
  }, []);
  return null;
};

const Header = () => {
  return (
    <div>
      <button onClick={() => history.push("/react")}>react-child</button>
      <button onClick={() => history.push("/vue")}>react-vue</button>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      Father content
      <Header />
      <LoadingState />
      <SendWhileMount />
      <FeedbackDemo />
    </div>
  );
};
