# `micro-front-father`

> 基于 qinkun，提供：与子应用的事件通信方式；qiankun 事件传递

## Necessary

```$xslt
"lodash": "^4.x"
```

## Install

```
yarn add @bridge-start/micro-front-father
```

## Usage 注册应用与启动

```
import { registerApps, start } from "@bridge-start/micro-front-father";
//注册，详见qiankun api
registerApps([
  {
    name: "react-child",
    container: "#sub",
    entry: `//localhost:3101`,
    activeRule: "/react",
  },
  {
    name: "vue-child",
    container: "#sub",
    entry: `//localhost:3102`,
    activeRule: "/vue",
  },
]);
//启动
start();
```

## Usage 生命周期

```
import {
  registerListener,
  removeListener,
} from "@bridge-start/micro-front-father";

  //监听AfterMount生命周期
  useEffect(() => {
    const handleMount = () => {
      //send something
      sendStateToChild({ name: "init", params: { name: "zx", from: "father" } });
    };
    registerListener("AfterMount", handleMount);
    return () => {
      removeListener("AfterMount", handleMount);
    };
  }, []);

```

## Usage 与子应用通信

```
import {
  sendStateToChild,
  registerChildStateListener,
  removeChildStateListener,
  IDataApp,
} from "@bridge-start/micro-front-father";

  //监听子应用发送的'login-request'事件，并返回'登录信息'
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
```

详细使用方式见 [example(react)](https://github.com/zxeryu/start/tree/master/example/micro-father)
&nbsp;[example(vue)](https://github.com/zxeryu/start/tree/master/example/micro-father-vue)
