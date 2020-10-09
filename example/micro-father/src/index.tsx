import React from "react";
import ReactDOM from "react-dom";
import { registerApps, start } from "@bridge-start/micro-front-father";
import { App } from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

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
