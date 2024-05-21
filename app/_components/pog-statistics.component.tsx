"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useSubscription } from "./use-subscription.hook";

export type PogStatisticsProps = {
  children?: ReactNode;
};

export function PogStatistics({ children }: PogStatisticsProps) {
  // N.B: Call the usePubSub hook, defining an onMessage callback that will respond to `notify` events dispatched by subscribers.
  const [pogs, setPogs] = useState(0);

  useSubscription("pog.generated", (data) => {
    setPogs((prevValue) => prevValue + 1);
  });

  useSubscription("pog.flip", (data) => {
    alert(`You flipped Pog: ${data.name}`);
  });

  return (
    <>
      <h1>Unsplash Pogs</h1>
      <p>You have {pogs} pogs!</p>
      {children}
    </>
  );
}
