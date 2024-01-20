import { GameSummaryTable } from "~/components/GameSummaryTable";
import type { FinalGame, GameStats, LiveGame } from "~/components/types";

type SummarySectionProps = {
  readonly game: LiveGame | FinalGame;
  readonly gameStats: GameStats;
};

export const SummarySection = ({ game, gameStats }: SummarySectionProps) => {
  return (
    <section>
      <h1 className="text-2xl font-semibold">Game Summary</h1>
      <div className="overflow-x-auto">
        <GameSummaryTable game={game} gameStats={gameStats} />
      </div>
    </section>
  );
};
