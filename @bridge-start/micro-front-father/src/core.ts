import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, prefetchApps, LoadableApp } from "qiankun";
import { RegistrableApp } from "qiankun/es/interfaces";
import { sendLifecycleEvent } from "./events";
import { map } from "lodash";

export type IDataApp = LoadableApp & { loading?: boolean };

export const registerApps = (apps: Array<RegistrableApp>) => {
  registerMicroApps(
    map(apps, (item) => {
      if (!item.loader) {
        item.loader = (loading) => {
          sendLifecycleEvent("Loading", { ...item, loading });
        };
      }
      return item;
    }),
    {
      beforeLoad: (app) => {
        sendLifecycleEvent("BeforeLoad", app);
        return Promise.resolve();
      },
      beforeMount: (app) => {
        sendLifecycleEvent("BeforeMount", app);
        return Promise.resolve();
      },
      afterMount: (app) => {
        sendLifecycleEvent("AfterMount", app);
        return Promise.resolve();
      },
      beforeUnmount: (app) => {
        sendLifecycleEvent("BeforeUnmount", app);
        return Promise.resolve();
      },
      afterUnmount: (app) => {
        sendLifecycleEvent("AfterUnmount", app);
        return Promise.resolve();
      },
    },
  );
};

export const fixStyleLost = () => {
  const originAppendChild = HTMLHeadElement.prototype.appendChild;
  Object.defineProperty(HTMLHeadElement.prototype, "appendChild", {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    set() {}, // 使后来的重写操作失效
    get() {
      return (newChild: any) => {
        return originAppendChild.call(this, newChild);
      };
    },
  });
};

export { start, setDefaultMountApp, runAfterFirstMounted, prefetchApps };
