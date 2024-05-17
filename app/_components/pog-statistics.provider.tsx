import { ReactNode } from "react";
import { PogStatisticsStore } from "./pog-statistics.store";
import { Pog } from "./pog.type";

export type PogStatisticsProviderProps = {
  children?: ReactNode;
};

export async function PogStatisticsProvider({
  children,
}: PogStatisticsProviderProps) {
  return <PogStatisticsStore>{children}</PogStatisticsStore>;
}
