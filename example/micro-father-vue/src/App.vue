<template>
  <div>
    Father content vue
    <div>
      <button @click="handleReactChildClick">react-child</button>
      <button @click="handleVueChildClick">react-vue</button>
    </div>
  </div>
</template>

<script>
import { createBrowserHistory } from "history";
import {
  registerChildStateListener,
  registerListener,
  removeChildStateListener,
  removeListener,
  sendStateToChild,
} from "@bridge-start/micro-front-father";
const history = createBrowserHistory();
export default {
  name: "App",
  mounted() {
    registerListener("AfterMount", this.handleMount);
    registerChildStateListener(this.handleChildState, "login-request");
  },
  beforeDestroy() {
    removeListener("AfterMount", this.handleMount);
    removeChildStateListener(this.handleChildState);
  },
  methods: {
    handleReactChildClick() {
      history.push("/react");
    },
    handleVueChildClick() {
      history.push("/vue");
    },
    handleMount() {
      sendStateToChild({ name: "init", params: { name: "zx", from: "father" } });
    },
    handleChildState() {
      sendStateToChild({
        name: "login",
        params: { token: `token${new Date().getTime()}`, from: "father" },
      });
    },
  },
};
</script>

<style scoped></style>
