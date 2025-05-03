import { TableCell } from "~/components/Table/TableCell";
import { TeamNameTableCell } from "~/components/Table/TeamNameTableCell";
import type { GameStats, LiveGame } from "~/components/types";
import { useLiveGameStats } from "./hooks/useLiveGameStats";

type LiveGameSummaryTableProps = {
  readonly game: LiveGame;
  readonly gameStats: GameStats;
};

export const LiveGameSummaryTable = ({
  game,
  gameStats,
}: LiveGameSummaryTableProps) => {
  const liveGameStats = useLiveGameStats({ game, gameStats });
  const { periods, visitingTeam, homeTeam, visitingScore, homeScore } =
    liveGameStats;
  const firstPeriod = periods[0];
  const secondPeriod = periods[1];
  const thirdPeriod = periods[2];

  return (
    <table className="my-5 min-w-full border border-pwhl-purple-50 text-center md:w-80 md:min-w-min lg:w-96">
      <thead className="bg-pwhl-purple-50 font-bold text-white">
        <tr>
          <TableCell>Team</TableCell>
          <TableCell>1st</TableCell>
          <TableCell>2nd</TableCell>
          <TableCell>3rd</TableCell>
          <TableCell>T</TableCell>
        </tr>
      </thead>
      <tbody>
        <tr className="text-black">
          <TeamNameTableCell
            shotsOnGoal={visitingTeam.sog}
            team={game.visitingTeam}
          />
          <TableCell>{firstPeriod.visitorGoals}</TableCell>
          <TableCell>{secondPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{visitingScore}</TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell team={game.homeTeam} shotsOnGoal={homeTeam.sog} />
          <TableCell>{firstPeriod.homeGoals}</TableCell>
          <TableCell>{secondPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{homeScore}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
