import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, prefetchApps } from "qiankun";
import { RegistrableApp } from "qiankun/es/interfaces";
import { sendLifecycleEvent } from "./events";

export const registerApps = (apps: Array<RegistrableApp>) => {
  registerMicroApps(apps, {
    beforeLoad: (app) => {
      return Promise.resolve(sendLifecycleEvent("BeforeLoad", app));
    },
    beforeMount: (app) => {
      return Promise.resolve(sendLifecycleEvent("BeforeMount", app));
    },
    afterMount: (app) => {
      return Promise.resolve(sendLifecycleEvent("AfterMount", app));
    },
    beforeUnmount: (app) => {
      return Promise.resolve(sendLifecycleEvent("BeforeUnmount", app));
    },
    afterUnmount: (app) => {
      return Promise.resolve(sendLifecycleEvent("AfterUnmount", app));
    },
  });
};

export { start, setDefaultMountApp, runAfterFirstMounted, prefetchApps };
