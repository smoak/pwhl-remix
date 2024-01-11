import { TeamInfo } from "~/components/TeamInfo";
import { type Game, isFinalGame, isLiveGame } from "~/components/types";
import { FinalGameContents } from "./FinalGameContents";
import { StartTime } from "../StartTime";
import { LiveGameContents } from "./LiveGameContents";

type ContentsProps = {
  readonly game: Game;
};

export const Contents = ({ game }: ContentsProps) => {
  if (isFinalGame(game)) {
    return <FinalGameContents game={game} />;
  }

  if (isLiveGame(game)) {
    return <LiveGameContents game={game} />;
  }

  return (
    <>
      <TeamInfo logoUrl={game.homeTeam.logoUrl} teamName={game.homeTeam.name} />
      <div className="mt-3 flex flex-1">
        <p className="flex flex-1 justify-center whitespace-nowrap px-3 pt-1.5 text-center uppercase">
          <StartTime date={new Date(game.gameDate)} />
        </p>
      </div>
      <TeamInfo
        logoUrl={game.visitingTeam.logoUrl}
        teamName={game.visitingTeam.name}
      />
    </>
  );
};
