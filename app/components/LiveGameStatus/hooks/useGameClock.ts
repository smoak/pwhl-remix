import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import { GameClock } from "~/components/types";
import { RunningClockSnapshot } from "~/data/firebase/types";

type UseGameClockOptions = {
  readonly fallback: GameClock;
  readonly gameId: number;
};
export const useGameClock = ({ fallback, gameId }: UseGameClockOptions) => {
  const [snapshot, isLoading] = useObjectVal<RunningClockSnapshot>(
    query(
      child(ref(firebaseDatabase), `/svf/pwhl/runningclock/games/${gameId}`)
    )
  );

  if (!snapshot || isLoading) {
    return {
      currentPeriod: fallback.period,
      isIntermission: fallback.isInIntermission,
      isRunning: true,
      timeRemaining: fallback.clockTime,
    };
  }

  return {
    currentPeriod: snapshot.Clock.period,
    isIntermission:
      fallback.isInIntermission ||
      (snapshot.Clock.Minutes === "00" &&
        snapshot.Clock.Seconds === "00" &&
        !snapshot.Clock.Running),
    isRunning: snapshot.Clock.Running,
    timeRemaining: [snapshot.Clock.Minutes, snapshot.Clock.Seconds].join(":"),
  };
};
