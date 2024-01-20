import { TableCell } from "~/components/Table/TableCell";
import { TeamNameTableCell } from "~/components/Table/TeamNameTableCell";
import type { GameStats, LiveGame } from "~/components/types";

type LiveGameSummaryTableProps = {
  readonly game: LiveGame;
  readonly gameStats: GameStats;
};

export const LiveGameSummaryTable = ({
  game,
  gameStats,
}: LiveGameSummaryTableProps) => {
  const { periods } = gameStats;
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
            shotsOnGoal={gameStats.visitingTeam.sog}
            team={game.visitingTeam}
          />
          <TableCell>{firstPeriod.visitorGoals}</TableCell>
          <TableCell>{secondPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.visitorGoals ?? "-"}</TableCell>
          <TableCell>{game.visitingScore}</TableCell>
        </tr>
        <tr className="text-black">
          <TeamNameTableCell
            team={game.homeTeam}
            shotsOnGoal={gameStats.homeTeam.sog}
          />
          <TableCell>{firstPeriod.homeGoals}</TableCell>
          <TableCell>{secondPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{thirdPeriod?.homeGoals ?? "-"}</TableCell>
          <TableCell>{game.homeScore}</TableCell>
        </tr>
      </tbody>
    </table>
  );
};
