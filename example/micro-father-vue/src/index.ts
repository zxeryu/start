import Vue from "vue";
// @ts-ignore
import App from "./App";
import { registerApps, start } from "@bridge-start/micro-front-father";

new Vue({
  render: (h) => h(App),
}).$mount("#root");

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

start();
