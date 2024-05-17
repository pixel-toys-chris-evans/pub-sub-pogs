"use client";

import { useState } from "react";
import { type Pog as PogType } from "./pog.type";
import { Pog } from "./pog.component";

export function PogGenerator() {
  const [pogs, setPogs] = useState<PogType[]>([]);

  const generatePog = async () => {
    const req = await fetch(`https://picsum.photos/256`, {
      cache: "no-store",
    });

    if (req.ok) {
      setPogs((prev) => {
        const arr = [...prev];

        arr.push({
          image: `https://picsum.photos/id/${req.headers.get("picsum-id") as string}/256`,
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
