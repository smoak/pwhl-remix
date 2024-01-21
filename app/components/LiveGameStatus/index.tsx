import type { GameClock } from "../types";
import { useClockTime } from "./useClockTime";

const LiveIndicator = () => (
  <span className="mx-auto block pt-2 text-xs tracking-widest">
    <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
    Live
  </span>
);

// TODO: i18n
const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);
const formatOrdinals = (n: number) => {
  const rule = pr.select(n);
  const suffix = suffixes.get(rule);
  return `${n}${suffix}`;
};

type LiveGameStatusProps = {
  readonly gameId: number;
  readonly gameClock: GameClock;
  readonly isPlayoffGame: boolean;
};

export const LiveGameStatus = ({
  gameId,
  gameClock,
  isPlayoffGame,
}: LiveGameStatusProps) => {
  const liveClock = useClockTime(gameId);
  const { isInIntermission } = gameClock;
  const period = liveClock?.period ?? gameClock.period;
  const clockTime = liveClock?.time ?? gameClock.clockTime;

  if (liveClock?.isIntermission || isInIntermission) {
    return (
      <>
        {formatOrdinals(period)} - END
        <LiveIndicator />
      </>
    );
  }

  if (period < 4) {
    return (
      <>
        {formatOrdinals(period)} - {clockTime}
        <LiveIndicator />
      </>
    );
  }

  if (period === 4) {
    return (
      <>
        OT - {clockTime}
        <LiveIndicator />
      </>
    );
  }

  if (!isPlayoffGame) {
    return (
      <>
        SO - {clockTime}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = period - 3;

  return (
    <>
      {otPeriods}OT - {clockTime}
      <LiveIndicator />
    </>
  );
};
