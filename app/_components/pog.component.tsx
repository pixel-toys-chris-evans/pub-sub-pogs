"use client";

import { useEffect, useState } from "react";
import { usePogStatistics } from "./pog-statistics.store";
import { type Pog } from "./pog.type";
import { useSubscription } from "./use-pub-sub.hook";

export type PogProps = Pog & {};

export function Pog({ image }: PogProps) {
  const { register } = usePogStatistics();
  const [message, setMessage] = useState("");

  const subscription = useSubscription(register, () => ({ image }));

  const onClick = () => {
    setMessage("");
    subscription?.broadcast("pog.taunt");
    subscription?.notify("pog.flip");
  };

  useEffect(() => {
    if (subscription) {
      subscription.listen("pog.taunt", ({ event, data, context }) => {
        setMessage(`I've been taunted by Pog: "${context.id}"!`);
      });
    }
  }, [subscription]);

  return (
    <figure onClick={onClick}>
      <img
        className="block rounded-full w-32 aspect-square object-cover bg-slate-100"
        src={image}
        alt="Poggers"
      />
      <figcaption>{message}</figcaption>
    </figure>
  );
}
