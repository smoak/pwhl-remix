import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { LiveGame } from "~/components/types";
import { firebaseDatabase } from "~/data/firebase";
import { GoalsSummarySnapshot } from "~/data/firebase/types";

type LiveScore = {
  readonly homeScore: number;
  readonly visitingScore: number;
};

export const useLiveScore = ({
  id,
  homeScore,
  visitingScore,
}: LiveGame): LiveScore => {
  const [snapshot, isLoading] = useObjectVal<GoalsSummarySnapshot>(
    query(child(ref(firebaseDatabase), `/svf/pwhl/goalssummary/1/games/${id}`))
  );

  if (!snapshot || isLoading) {
    return {
      homeScore,
      visitingScore,
    };
  }

  return {
    homeScore: snapshot.HomeGoalTotal,
    visitingScore: snapshot.VisitorGoalTotal,
  };
};
