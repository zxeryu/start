<template>
  <div style="background-color: rgba(255, 0, 0, 0.2)">
    Child content vue

    <div>
      <p>接收到Father init参数:</p>
      <p>{{ initData }}</p>
    </div>

    <div>
      <p>与Father互动 <button @click="handleLoginClick">获取登录信息</button></p>
      <p>接受到登录信息：{{ loginData }}</p>
    </div>
  </div>
</template>

<script>
import {
  registerFatherStateListener,
  removeFatherStateListener,
  sendStateToFather,
} from "@bridge-start/micro-front-child";

export default {
  name: "App",
  data() {
    return { initData: "", loginData: "" };
  },
  mounted() {
    registerFatherStateListener(this.handleInitParams, "init");
    registerFatherStateListener(this.handleLoginParams, "login");
  },
  beforeDestroy() {
    removeFatherStateListener(this.handleInitParams);
    removeFatherStateListener(this.handleLoginParams);
  },
  methods: {
    handleInitParams(data) {
      this.initData = JSON.stringify(data.params);
    },
    handleLoginParams(data) {
      this.loginData = JSON.stringify(data.params);
    },
    handleLoginClick() {
      sendStateToFather({ name: "login-request" });
    },
  },
};
</script>
