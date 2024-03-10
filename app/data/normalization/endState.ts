import type { EndState } from "~/components/types";

type NormalizeEndStateOptions = {
  readonly gameStatusStringLong: string;
  readonly endedInPeriod: number;
};
export const normalizeEndState = ({
  endedInPeriod,
  gameStatusStringLong,
}: NormalizeEndStateOptions): EndState => {
  if (gameStatusStringLong === "Final SO") {
    return "SO";
  }

  if (gameStatusStringLong === "Unofficial Final" && endedInPeriod > 3) {
    return "OT";
  }

  return "Regulation";
};
