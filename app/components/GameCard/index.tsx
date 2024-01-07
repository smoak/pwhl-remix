import type { Game } from "../types";
import { Contents } from "./Contents";

export type GameCardProps = {
  readonly game: Game;
};

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <article className="flex h-36 rounded-lg border border-pwhl-purple-50">
      <div className="flex w-full p-8">
        <Contents game={game} />
      </div>
    </article>
  );
};
