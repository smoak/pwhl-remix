import type { EndState } from "~/components/types";

const fromEndedPeriod = (period: number): EndState => {
  if (period === 3) {
    return "Regulation";
  }

  if (period === 4) {
    return "OT";
  }

  return "SO";
};

type NormalizeEndStateOptions = {
  readonly gameStatusStringLong: string;
  readonly endedInPeriod: number;
};
export const normalizeEndState = ({
  endedInPeriod,
  gameStatusStringLong,
}: NormalizeEndStateOptions): EndState => {
  if (gameStatusStringLong === "Unofficial Final") {
    return fromEndedPeriod(endedInPeriod);
  }

  if (gameStatusStringLong.includes("OT")) {
    return "OT";
  }

  if (gameStatusStringLong.includes("SO")) {
    return "SO";
  }

  return "Regulation";
};
