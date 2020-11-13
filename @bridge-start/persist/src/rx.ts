import { BehaviorSubject, fromEvent, merge } from "rxjs";
import { tap } from "rxjs/operators";
import { filter, forEach, isUndefined, keys, uniq, startsWith } from "lodash";
import { isPersist, PersistFlag, PersistKey, Storage } from "./core";

type TClear = () => void;

export const persistFromRx = (storage: Storage, subject$: BehaviorSubject<any>): TClear => {
  let prevState: any = {};
  const sub = merge(
    subject$.pipe(
      tap((nextState) => {
        const keysToDelete: string[] = [];
        const persists: string[] = [];

        const nextDataToState: { [key: string]: any } = {};

        const allPersists = uniq(filter([...keys(prevState), ...keys(nextState)], (key) => isPersist(key)));
        forEach(allPersists, (key) => {
          if (!!prevState[key] && isUndefined(nextState[key])) {
            keysToDelete.push(key);
            return;
          }
          persists.push(key);
          if (nextState[key] !== prevState[key]) {
            nextDataToState[key] = nextState[key];
          }
        });

        prevState = nextState;

        nextDataToState[PersistKey] = persists;

        storage.saveAll(nextDataToState);
        storage.removeAll(keysToDelete);
      }),
    ),
    fromEvent<StorageEvent>(globalThis, "storage").pipe(
      tap((e) => {
        if (!e.isTrusted || !e.key || !e.newValue) {
          return;
        }
        const prefix = storage.s.config().name!;
        if (!startsWith(e.key, prefix)) {
          return;
        }

        const finalKey = e.key.replace(prefix + "/", "");
        if (!startsWith(finalKey, PersistFlag)) {
          return;
        }

        try {
          const values = JSON.parse(e.newValue);

          subject$.next({
            ...subject$.value,
            [finalKey]: values,
          });

          console.warn(finalKey, "updated from storage");
        } catch (e) {
          console.error(e);
        }
      }),
    ),
  ).subscribe();

  return () => {
    prevState = undefined;
    sub.unsubscribe();
  };
};
