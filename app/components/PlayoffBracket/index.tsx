import type { PlayoffRound } from "../types";
import { Round } from "./Round";

type PlayoffBracketProps = {
  readonly rounds: PlayoffRound[];
};
export const PlayoffBracket = ({ rounds }: PlayoffBracketProps) => {
  return (
    <>
      <h1 className="mb-3 text-4xl font-bold">Playoff Bracket</h1>
      {rounds.map((round) => (
        <div className="flex flex-col" key={round.id}>
          <Round round={round} />
        </div>
      ))}
    </>
  );
};
