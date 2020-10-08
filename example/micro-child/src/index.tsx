import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { mountEvents, unmountEvents } from "@bridge-start/micro-front-child";
import { mockDev } from "./dev";

const render = (props: any) => {
  const { container } = props;
  ReactDOM.render(<App />, container ? container.querySelector("#root") : document.getElementById("root"));
};

export const bootstrap = async () => {
  console.log("[react-my] react child app bootstraped");
};

export const mount = async (props: any) => {
  render(props);
  mountEvents(props);
};

export const unmount = async (props: any) => {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector("#root") : document.querySelector("#root"));

  unmountEvents();
};

mockDev(mount);
