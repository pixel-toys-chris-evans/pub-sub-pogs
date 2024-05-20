"use client";

import { EventEmitter } from "eventemitter3";
import { useEffect } from "react";

const emitter = new EventEmitter();

export function useSubscription(
  listeners: Record<string, (data?: any) => void>,
) {
  const unsubscribe = () => {
    Object.entries(listeners).forEach(([event, callback]) => {
      emitter.off(event, callback);
    });
  };

  useEffect(() => {
    Object.entries(listeners).forEach(([event, callback]) => {
      emitter.on(event, callback);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return unsubscribe;
}

export function useBroadcast() {
  return (event: string, data?: any) => {
    emitter.emit(event, data);
  };
}
