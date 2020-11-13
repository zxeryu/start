import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { Persist } from "@bridge-start/persist";
import { BehaviorSubject } from "rxjs";

const Connect = ({ store$, persist }: { store$: BehaviorSubject<{ [key: string]: any }>; persist: Persist }) => {
  useEffect(() => {
    const clear = persist.persistRx(store$);
    return () => {
      clear();
    };
  }, []);
  return null;
};

const persist = new Persist({ name: "bridge" });
persist.loadPersistData((values) => {
  const store$ = new BehaviorSubject<{ [key: string]: any }>(values as any);

  ReactDOM.render(
    <div>
      <App store$={store$} />
      <Connect store$={store$} persist={persist} />
    </div>,
    document.getElementById("root"),
  );
});
