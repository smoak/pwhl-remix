import { ClockStatusIcon } from "../ClockStatusIcon";
import { PeriodOrdinal } from "../PeriodOrdinal";
import type { GameClock } from "../types";
import { useGameClock } from "./hooks/useGameClock";

const LiveIndicator = () => (
  <span className="mx-auto block pt-2 text-xs tracking-widest">
    <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-red-700" />
    Live
  </span>
);

type LiveGameStatusProps = {
  readonly gameClock: GameClock;
  readonly gameId: number;
  readonly isPlayoffGame: boolean;
};

export const LiveGameStatus = ({
  gameClock,
  gameId,
  isPlayoffGame,
}: LiveGameStatusProps) => {
  const { currentPeriod, isIntermission, isRunning, timeRemaining } =
    useGameClock({ fallback: gameClock, gameId });

  if (currentPeriod < 4) {
    return (
      <>
        <span className="flex flex-row gap-1">
          <span>
            <PeriodOrdinal period={currentPeriod} />
          </span>
          {isIntermission ? "END" : timeRemaining}
        </span>
        <ClockStatusIcon
          isIntermission={isIntermission}
          isWhistle={!isRunning}
        />
        <LiveIndicator />
      </>
    );
  }

  if (currentPeriod === 4) {
    return (
      <>
        OT - {timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  if (!isPlayoffGame) {
    return (
      <>
        SO - {timeRemaining}
        <LiveIndicator />
      </>
    );
  }

  const otPeriods = currentPeriod - 3;

  return (
    <>
      {otPeriods}OT - {timeRemaining}
      <LiveIndicator />
    </>
  );
};
