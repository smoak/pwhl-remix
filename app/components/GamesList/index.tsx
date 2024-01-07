import { GameCard } from "~/components/GameCard";
import type { Game } from "../types";

export type GamesListProps = {
  readonly games: Game[];
};

export const GamesList = ({ games }: GamesListProps) => {
  if (games.length === 0) {
    return (
      <div className="grid grid-cols-auto-fill gap-5">
        <h1 className="mt-9 text-center text-3xl font-bold md:col-span-4">
          No games scheduled
        </h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-auto-fill gap-5">
      {games.map((game) => {
        return <GameCard key={game.id} game={game} />;
      })}
    </div>
  );
};
