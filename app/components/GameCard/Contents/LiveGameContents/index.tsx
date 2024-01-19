import { LiveGameStatus } from "~/components/LiveGameStatus";
import { Score } from "~/components/Score";
import { TeamInfo } from "~/components/TeamInfo";
import type { LiveGame } from "~/components/types";
import { useGoalsSummary } from "./useGoalsSummary";

type LiveGameContentsProps = {
  readonly game: LiveGame;
};

export const LiveGameContents = ({ game }: LiveGameContentsProps) => {
  const goalsSummary = useGoalsSummary(game.id);

  return (
    <>
      <TeamInfo logoUrl={game.homeTeam.logoUrl} teamName={game.homeTeam.name} />
      <div className="mt-3 flex flex-1">
        <Score score={goalsSummary?.homeGoalTotal ?? game.homeScore} />
        <p className="flex-1 whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <LiveGameStatus
            gameClock={game.gameClock}
            isPlayoffGame={false}
            gameId={game.id}
          />
        </p>
        <Score score={goalsSummary?.visitorGoalTotal ?? game.visitingScore} />
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
      />
    </>
  );
};
