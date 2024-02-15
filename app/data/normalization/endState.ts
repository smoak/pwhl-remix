import type { EndState } from "~/components/types";

export const normalizeEndState = (gameStatusStringLong: string): EndState => {
  if (gameStatusStringLong === "Final SO") {
    return "SO";
  }

  if (
    gameStatusStringLong === "Final" ||
    gameStatusStringLong === "Unofficial Final"
  ) {
    return "Regulation";
  }

  return "OT";
};
