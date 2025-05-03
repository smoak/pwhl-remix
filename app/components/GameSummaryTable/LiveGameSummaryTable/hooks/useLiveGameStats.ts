import { child, query, ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { useLiveScore } from "~/components/GameCard/Contents/LiveGameContents/hooks/useLiveScore";
import { GamePeriod, GameStats, LiveGame } from "~/components/types";
import { firebaseDatabase } from "~/data/firebase";
import { ShotsSummarySnapshot } from "~/data/firebase/types";

type UseLiveGameStatsOptions = {
  readonly game: LiveGame;
  readonly gameStats: GameStats;
};

type LiveGameStats = GameStats & ReturnType<typeof useLiveScore>;

export const useLiveGameStats = ({
  game,
  gameStats,
}: UseLiveGameStatsOptions): LiveGameStats => {
  const liveScore = useLiveScore(game);

  const [snapshot, isLoading] = useObjectVal<ShotsSummarySnapshot>(
    query(
      child(ref(firebaseDatabase), `/svf/pwhl/shotssummary/1/games/${game.id}`)
    )
  );

  if (!snapshot || isLoading) {
    return {
      ...gameStats,
      ...liveScore,
    };
  }

  return {
    ...liveScore,
    homeTeam: {
      score: liveScore.homeScore,
      sog: snapshot.HomeShotTotal
    },
    periods: gameStats.periods,
    scoringPlays: gameStats.scoringPlays,
    visitingTeam: {
      score: liveScore.visitingScore,
      sog: snapshot.VisitorShotTotal
    },
  }
};
