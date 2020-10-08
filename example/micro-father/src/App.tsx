import React, { useEffect } from "react";
import {
  sendStateToChild,
  registerChildStateListener,
  registerListener,
  removeChildStateListener,
  removeListener,
} from "@bridge-start/micro-front-father";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

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
  const handle = () => {
    sendStateToChild({
      name: "login",
      params: { token: `token${new Date().getTime()}`, from: "father" },
    });
  };
  useEffect(() => {
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
