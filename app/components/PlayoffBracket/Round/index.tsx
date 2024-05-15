import type { PlayoffRound } from "~/components/types";
import { Matchup } from "../Matchup";

type RoundProps = {
  readonly round: PlayoffRound;
};

export const Round = ({ round }: RoundProps) => {
  const { matchups } = round;

  if (matchups.length === 0) {
    return (
      <div className="my-3 flex flex-col gap-2">
        <div className="border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
          {round.name}
        </div>
        <div className="flex justify-center font-bold">Series not started</div>
      </div>
    );
  }

  return (
    <div className="my-3 flex flex-col gap-2">
      <div className="border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        {round.name}
      </div>
      {matchups.map((matchup) => (
        <Matchup matchup={matchup} key={matchup.id} />
      ))}
    </div>
  );
};
