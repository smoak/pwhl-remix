import { GameCard } from "~/components/GameCard";
import type { Game } from "../types";
import { useHydration } from "~/hooks/useHydration";
import { isSameDay } from "date-fns";
import { Suspense } from "react";
import { Skeleton } from "./Skeleton";
import { Link } from "@remix-run/react";

export type GamesListProps = {
  readonly games: Game[];
  readonly filter: Date;
};

const FilteredGamesList = ({ games }: Omit<GamesListProps, "filter">) => {
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
        return (
          <Link prefetch="intent" to={`/game/${game.id}`} key={game.id}>
            <GameCard game={game} />
          </Link>
        );
      })}
    </div>
  );
};

export const GamesList = ({ games, filter }: GamesListProps) => {
  const hydrated = useHydration();

  if (!hydrated) {
    return <Skeleton />;
  }

  const filteredGames = games.filter((g) =>
    isSameDay(filter, new Date(g.gameDate))
  );

  return (
    <Suspense key={hydrated ? "local" : "utc"} fallback={<Skeleton />}>
      <FilteredGamesList games={filteredGames} />
    </Suspense>
  );
};
