import type { GameClock } from "../types";

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
  readonly gameClock: GameClock;
  readonly isPlayoffGame: boolean;
};

export const LiveGameStatus = ({
  gameClock,
  isPlayoffGame,
}: LiveGameStatusProps) => {
  const { clockTime, isInIntermission, period } = gameClock;

  if (isInIntermission) {
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
