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

  return {
    period: parseInt(snapshot.Clock.period),
    time: [snapshot.Clock.Minutes, snapshot.Clock.Seconds].join(":"),
    gameState:
      ApiGameStatusToGameState[snapshot.status_id.toString() as GameStatus],
  };
};
