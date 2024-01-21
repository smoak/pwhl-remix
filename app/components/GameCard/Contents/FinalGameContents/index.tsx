import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { EndState, FinalGame } from "~/components/types";

type FinalGameContentsProps = {
  readonly game: FinalGame;
};

const EndStateToText: Record<EndState, string> = {
  OT: "Final/OT",
  Regulation: "Final",
  SO: "Final/SO",
};

export const FinalGameContents = ({ game }: FinalGameContentsProps) => {
  return (
    <>
      <TeamInfo logoUrl={game.homeTeam.logoUrl} teamName={game.homeTeam.name} />
      <div className="mt-3 flex flex-1">
        <Score score={game.homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          {EndStateToText[game.endState]}
        </p>
        <Score score={game.visitingScore} />
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
      />
    </>
  );
};
