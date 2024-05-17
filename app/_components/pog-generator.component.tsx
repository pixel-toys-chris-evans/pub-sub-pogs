"use client";

import { useState } from "react";
import { type Pog as PogType } from "./pog.type";
import { Pog } from "./pog.component";

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function PogGenerator() {
  const [pogs, setPogs] = useState<PogType[]>([]);

  const generatePog = async () => {
    setPogs((prev) => {
      const arr = [...prev];

      arr.push({
        image: `https://picsum.photos/id/${randomIntFromInterval(1, 1000)}/256.webp`,
      });
      return arr;
    });
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
