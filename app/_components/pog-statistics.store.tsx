"use client";

import { createContext, useContext, type ReactNode } from "react";
import { PubSubCallback, Subscriber, usePubSub } from "./use-pub-sub.hook";
import { Pog } from "./pog.type";

export type PogStatisticsStore = {
  // N.B: Pub/Sub Service Methods
  register: PubSubCallback<Pog>;
  subscribers: Subscriber<Pog>[];
};

const CONTEXT_INITIALISER: PogStatisticsStore = {
  subscribers: [],
  register: () => ({
    notify: () => {},
    delist: () => {},
    broadcast: () => {},
    listen: () => {},
  }),
};

const PogStatisticsContext =
  createContext<PogStatisticsStore>(CONTEXT_INITIALISER);

export type PogStatisticsStoreProps = {
  children?: ReactNode;
};

export function PogStatisticsStore({ children }: PogStatisticsStoreProps) {
  // N.B: Call the usePubSub hook, defining an onMessage callback that will respond to `notify` events dispatched by subscribers.
  const { subscribers, register } = usePubSub<Pog>(
    ({ event, data, context }) => {
      switch (event) {
        case "pog.flip": {
          alert(`Pog ID: ${context.id} was flipped!`);
        }
        default:
      }
    },
  );

  return (
    <PogStatisticsContext.Provider value={{ subscribers, register }}>
      <h1>Unsplash Pogs</h1>
      <p>You have {subscribers.length} pogs!</p>
      {children}
    </PogStatisticsContext.Provider>
  );
}

export function usePogStatistics() {
  return useContext(PogStatisticsContext);
}
