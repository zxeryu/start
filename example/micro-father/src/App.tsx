import React, { useEffect } from "react";
import {
  dispatchGlobalState,
  registerGlobalStateListener,
  registerListener,
  removeGlobalStateListener,
  removeListener,
} from "@bridge-start/micro-front-father";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const SendWhileMount = () => {
  useEffect(() => {
    const handleMount = () => {
      dispatchGlobalState({ name: "init", params: { name: "zx", from: "father" } });
    };
    registerListener("AfterMount", handleMount);
    return () => {
      removeListener("AfterMount", handleMount);
    };
  }, []);
  return null;
};

const FeedbackDemo = () => {
  const handle = () => {
    dispatchGlobalState({
      name: "login",
      params: { token: `token${new Date().getTime()}`, from: "father" },
    });
  };
  useEffect(() => {
    registerGlobalStateListener(handle, "login-request");
    return () => {
      removeGlobalStateListener(handle);
    };
  }, []);
  return null;
};

const Header = () => {
  return (
    <div>
      <button onClick={() => history.push("/react")}>react-child</button>
    </div>
  );
};

export const App = () => {
  return (
    <div>
      Father content
      <Header />
      <SendWhileMount />
      <FeedbackDemo />
    </div>
  );
};
