import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebaseRunningClockSnapshot } from "~/data/types";
import type { GameState } from "../types";
import { ApiGameStatusToGameState } from "~/data/normalization/games";
import type { GameStatus } from "~/api/types";

type ClockTime = {
  readonly period: number;
  readonly time: string;
  readonly gameState: GameState;
  readonly isIntermission: boolean;
};
export const useClockTime = (gameId: number): ClockTime | undefined => {
  const [snapshot, isLoading] = useObjectVal<FirebaseRunningClockSnapshot>(
    query(
      child(ref(firebaseDatabase), "/svf/pwhl/runningclock/games/" + gameId)
    )
  );

  if (!snapshot || isLoading) {
    return;
  }

  if (!snapshot.Clock) {
    console.warn("got a strange snapshot from runningclock", { snapshot });
    return;
  }

  // ugh, the snapshot does not give this info
  // so we have to "fake" it
  const isIntermission =
    !snapshot.Clock.Running &&
    snapshot.Clock.Minutes == "20" &&
    snapshot.Clock.Seconds == "00";

  return {
    period: parseInt(snapshot.Clock.period),
    time: [snapshot.Clock.Minutes, snapshot.Clock.Seconds].join(":"),
    gameState:
      ApiGameStatusToGameState[snapshot.status_id.toString() as GameStatus],
    isIntermission,
  };
};
