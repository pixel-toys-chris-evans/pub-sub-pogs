"use client";

import { nanoid } from "nanoid";
import { useCallback, useEffect, useRef, useState } from "react";

type ListenerCallback = ({
  event,
  data,
  context,
}: {
  event: string;
  data?: any;
  context: Subscriber;
}) => void;

export type Subscriber<TValue extends {} = Record<string, any>> = {
  id: string;
  value: () => TValue;
  listeners: {
    event: string;
    callback: ListenerCallback;
  }[];
};

export type Subscription = {
  listen: (event: string, callback: ListenerCallback) => void;
  notify: (event: string, data?: any) => void;
  broadcast: (event: string, data?: any) => void;
  delist: () => void;
};

export type PubSubCallback<TValue extends {} = Record<string, any>> = (
  get: () => TValue,
) => Subscription;

export function usePubSub<TValue extends {} = Record<string, any>>(
  onMessage: (event: {
    event: string;
    data?: any;
    context: Subscriber<TValue>;
  }) => void,
) {
  const [subscribers, setSubscribers] = useState<Subscriber<TValue>[]>([]);
  //N.B: Mutable Subscriber array for broadcasting messages.
  const $subscribers = useRef(subscribers);

  const broadcast = ({
    event,
    data,
    context,
  }: {
    event: string;
    data?: any;
    context: Subscriber;
  }) => {
    for (let subscriber of $subscribers.current.filter(
      (x) => x.id !== context.id,
    )) {
      const listener = subscriber.listeners.find((l) => l.event === event);
      if (typeof listener !== "undefined") {
        listener.callback({ event, data, context });
      }
    }
  };

  const register: PubSubCallback<TValue> = useCallback(
    (get) => {
      const id = nanoid();

      const subscriber: Subscriber<TValue> = {
        id,
        value: get,
        listeners: [],
      };

      const listen = (event: string, callback: ListenerCallback) => {
        setSubscribers((prev) => {
          const arr = [...prev];
          const idx = arr.findIndex((s) => s.id === subscriber.id);

          if (idx >= 0) {
            arr[idx].listeners.push({ event, callback });
          }

          $subscribers.current = arr;
          return arr;
        });

        return () => {
          setSubscribers((prev) => {
            const arr = [...prev];
            const idx = arr.findIndex((s) => s.id === subscriber.id);

            if (idx < 0) return arr;

            const listenerIdx = arr[idx].listeners.findIndex(
              (l) => l.event === event,
            );

            if (listenerIdx) {
              arr[idx].listeners.splice(listenerIdx, 1);
            }

            $subscribers.current = arr;
            return arr;
          });
        };
      };

      const notify = (event: string, data?: any) =>
        onMessage({ event, data, context: subscriber });

      const delist = () => {
        setSubscribers((prev) => {
          const arr = [...prev];
          const idx = arr.findIndex((s) => s.id === subscriber.id);

          if (idx >= 0) {
            arr.splice(idx, 1);
          }

          $subscribers.current = arr;
          return arr;
        });
      };

      const $broadcast = (event: string, data?: any) => {
        broadcast({ event, data, context: subscriber });
      };

      setSubscribers((prev) => {
        return [...prev, subscriber];
      });

      return { listen, notify, broadcast: $broadcast, delist };
    },
    //eslint-disable-next-line -- We don't want to include 'broadcast' in the dependancies list as it should recompile every time a render is triggered.
    [onMessage],
  );

  return { register, subscribers };
}

export function useSubscription<TValue extends {} = Record<string, any>>(
  register: PubSubCallback<TValue>,
  get: () => TValue,
) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(
    () => {
      const _subscription = register(get);
      setSubscription(_subscription);

      return () => {
        _subscription.delist();
      };
    },
    //eslint-disable-next-line -- Only trigger subscription on mount.
    [],
  );

  return subscription;
}
