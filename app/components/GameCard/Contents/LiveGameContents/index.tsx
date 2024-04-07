import { LiveGameStatus } from "~/components/LiveGameStatus";
import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { LiveGame } from "~/components/types";

type LiveGameContentsProps = {
  readonly game: LiveGame;
};

export const LiveGameContents = ({ game }: LiveGameContentsProps) => {
  return (
    <>
      <TeamInfo
        logoUrl={game.homeTeam.logoUrl}
        teamName={game.homeTeam.name}
        record={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <Score score={game.homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <LiveGameStatus gameClock={game.gameClock} isPlayoffGame={false} />
        </p>
        <Score score={game.visitingScore} />
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
        record={game.visitingTeam.record}
      />
    </>
  );
};
