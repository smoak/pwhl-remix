import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { FinalGame } from "~/components/types";

type FinalGameContentsProps = {
  readonly game: FinalGame;
};

export const FinalGameContents = ({ game }: FinalGameContentsProps) => {
  return (
    <>
      <TeamInfo logoUrl={game.homeTeam.logoUrl} teamName={game.homeTeam.name} />
      <div className="mt-3 flex flex-1">
        <Score score={game.homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          FINAL
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
