"use client";

import { EventEmitter } from "eventemitter3";
import { useEffect } from "react";

const emitter = new EventEmitter();

export function useSubscription(event: string, callback: (data?: any) => void) {
  const unsubscribe = () => {
    emitter.off(event, callback);
  };

  useEffect(
    () => {
      emitter.on(event, callback);

      return () => {
        unsubscribe();
      };
    },
    //eslint-disable-next-line -- We only want to run this effect on Component Mount.
    [],
  );

  return unsubscribe;
}

export function useBroadcast() {
  return (event: string, data?: any) => {
    emitter.emit(event, data);
  };
}
