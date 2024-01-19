import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { firebaseDatabase } from "~/data/firebase";
import type { FirebaseGoalsSummarySnapshot } from "~/data/types";

type GoalsSummary = {
  readonly homeGoalTotal: number;
  readonly visitorGoalTotal: number;
};
type UseGoalsSummary = (gameId: number) => GoalsSummary | undefined;
export const useGoalsSummary: UseGoalsSummary = (gameId) => {
  const [snapshot, isLoading] = useObjectVal<FirebaseGoalsSummarySnapshot>(
    query(
      child(ref(firebaseDatabase), `/svf/pwhl/goalssummary/1/games/${gameId}`)
    )
  );

  if (!snapshot || isLoading) {
    return;
  }

  return {
    homeGoalTotal: snapshot.HomeGoalTotal,
    visitorGoalTotal: snapshot.VisitorGoalTotal,
  };
};
