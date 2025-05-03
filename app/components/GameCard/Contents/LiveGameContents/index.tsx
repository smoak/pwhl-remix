import { LiveGameStatus } from "~/components/LiveGameStatus";
import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { LiveGame } from "~/components/types";
import { useLiveScore } from "./hooks/useLiveScore";

type LiveGameContentsProps = {
  readonly game: LiveGame;
};

export const LiveGameContents = ({ game }: LiveGameContentsProps) => {
  const { homeScore, visitingScore } = useLiveScore(game);
  
  return (
    <>
      <TeamInfo
        logoUrl={game.homeTeam.logoUrl}
        teamName={game.homeTeam.name}
        record={game.homeTeam.record}
      />
      <div className="mt-3 flex flex-1">
        <Score score={homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <LiveGameStatus
            gameClock={game.gameClock}
            gameId={game.id}
            isPlayoffGame={false}
          />
        </p>
        <Score score={visitingScore} />
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
        record={game.visitingTeam.record}
      />
    </>
  );
};
