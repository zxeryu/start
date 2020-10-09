import Vue from "vue";
// @ts-ignore
import App from "./App";
import { mountEvents, unmountEvents } from "@bridge-start/micro-front-child";
import { mockDev } from "./dev";

Vue.config.productionTip = false;

let instance: any = null;

const render = (props: any) => {
  const { container } = props;
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector("#root") : "#root");
};

export const bootstrap = async () => {
  console.log("[vue] vue app bootstraped");
};

export const mount = async (props: any) => {
  render(props);
  mountEvents(props);
};

export const unmount = async () => {
  unmountEvents();
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
};

mockDev(mount);
