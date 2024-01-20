import type { GameDetails } from "../types";
import { ScoringSection } from "./ScoringSection";
import { SummarySection } from "./SummarySection";

type GameSummaryProps = {
  readonly gameDetails: GameDetails;
};
export const GameSummary = ({ gameDetails }: GameSummaryProps) => {
  const { game, gameStats } = gameDetails;

  if (game.gameState === "Scheduled") {
    return <h1 className="text-2xl font-semibold">Game has not started.</h1>;
  }

  return (
    <>
      <SummarySection game={game} gameStats={gameStats} />
      <ScoringSection scoringPlays={gameStats.scoringPlays} />
    </>
  );
};
