import {
  dispatchGlobalStateDev,
  IData,
  isMicroEnv,
  registerReturnStateListener,
  startDev,
} from "@bridge-start/micro-front-child";

const mockInitParams = () => {
  dispatchGlobalStateDev({ name: "init", params: { name: "zx", from: "child-mock" } });
};

const handlerReturnMock = (data: IData) => {
  if (data.name === "login-request") {
    dispatchGlobalStateDev({
      name: "login",
      params: { token: `token${new Date().getTime()}`, from: "child-mock" },
    });
  }
};

export const mockDev = (mount: (_: any) => {}) => {
  if (isMicroEnv()) {
    return;
  }
  startDev(mount);
  mockInitParams();
  registerReturnStateListener(handlerReturnMock);
};
