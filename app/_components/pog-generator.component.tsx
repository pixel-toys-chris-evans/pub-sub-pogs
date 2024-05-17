"use client";

import { useState } from "react";
import { type Pog as PogType } from "./pog.type";
import { Pog } from "./pog.component";

export function PogGenerator() {
  const [pogs, setPogs] = useState<PogType[]>([]);

  const generatePog = async () => {
    const req = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`,
      {
        cache: "no-store",
      },
    );
    if (req.ok) {
      const data = await req.json();
      setPogs((prev) => {
        const arr = [...prev];

        arr.push({
          image: data.urls.small ?? "",
        });
        return arr;
      });
    }
  };

  return (
    <ul className="list-none flex flex-row gap-8 flex-wrap">
      {pogs.map((p) => (
        <li className="w-48" key={p.image}>
          <Pog {...p} />
        </li>
      ))}
      <li>
        <button
          onClick={() => {
            generatePog();
          }}
        >
          Generate Pog
        </button>
      </li>
    </ul>
  );
}
