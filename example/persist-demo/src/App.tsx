import React, { useCallback, useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

export const App = ({ store$ }: { store$: BehaviorSubject<{ [key: string]: any }> }) => {
  const [state, setState] = useState<{ [key: string]: any }>();

  useEffect(() => {
    const sub = store$
      .pipe(
        tap((v) => {
          setState(v);
        }),
      )
      .subscribe();
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const update = useCallback((value: { [key: string]: any }) => {
    store$.next({ ...store$.value, ...value });
  }, []);

  return (
    <div>
      content:{JSON.stringify(state)}
      <br />
      <button onClick={() => update({ name: "eryu" })}>store$ - 普通key</button>
      <br />
      <button onClick={() => update({ $age: 22, $gender: "male" })}>store$ - persist key</button>
    </div>
  );
};
