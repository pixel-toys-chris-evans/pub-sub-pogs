"use client";

import { useRef, useState } from "react";
import { type Pog } from "./pog.type";
import { useBroadcast, useSubscription } from "./use-subscription.hook";
import { faker } from "@faker-js/faker";

export type PogProps = Pog & {};

export function Pog({ image }: PogProps) {
  const [message, setMessage] = useState("");

  const name = useRef(faker.person.firstName()).current;

  const broadcast = useBroadcast();
  useSubscription({
    "pog.taunt": (data) => {
      if (data.name !== name) {
        setMessage(`I've been taunted by Pog: "${data.name}"!`);
      }
    },
  });

  const onClick = () => {
    setMessage("");

    broadcast("pog.taunt", { name });
    broadcast("pog.flip", { name });
  };

  return (
    <figure onClick={onClick}>
      <img
        className="block rounded-full w-32 aspect-square object-cover bg-slate-100"
        src={image}
        alt="Poggers"
      />
      <figcaption>
        {message}
        <br />
        {name}
      </figcaption>
    </figure>
  );
}
