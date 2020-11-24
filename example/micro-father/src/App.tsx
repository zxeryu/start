import React, { useEffect, useRef, useState } from "react";
import {
  sendStateToChild,
  registerChildStateListener,
  registerListener,
  removeChildStateListener,
  removeListener,
  IDataApp,
  loadApp,
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

const HandleMicroApp = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const app = loadApp({ name: "child-react", container: ref.current!, entry: `//localhost:3102` });

    return () => {
      app.unmount();
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: 600 }} />;
};

const OperateMicro = () => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setLoaded((prevState) => !prevState)}>{loaded ? "loaded" : "unloaded"}</button>
      {loaded && <HandleMicroApp />}
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
      <OperateMicro />
    </div>
  );
};
