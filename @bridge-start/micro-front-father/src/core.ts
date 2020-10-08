import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, prefetchApps } from "qiankun";
import { RegistrableApp } from "qiankun/es/interfaces";
import { dispatch } from "./events";

export const registerApps = (apps: Array<RegistrableApp>) => {
  registerMicroApps(apps, {
    beforeLoad: (app) => {
      return Promise.resolve(dispatch("BeforeLoad", app));
    },
    beforeMount: (app) => {
      return Promise.resolve(dispatch("BeforeMount", app));
    },
    afterMount: (app) => {
      return Promise.resolve(dispatch("AfterMount", app));
    },
    beforeUnmount: (app) => {
      return Promise.resolve(dispatch("BeforeUnmount", app));
    },
    afterUnmount: (app) => {
      return Promise.resolve(dispatch("AfterUnmount", app));
    },
  });
};

export { start, setDefaultMountApp, runAfterFirstMounted, prefetchApps };
