import type { Team } from "~/components/types";
import { TableCell } from "../TableCell";
import { TeamLogo } from "~/components/TeamLogo";

type TeamNameTableCellProps = {
  readonly team: Team;
  readonly shotsOnGoal: number;
};

export const TeamNameTableCell = ({
  shotsOnGoal,
  team,
}: TeamNameTableCellProps) => {
  return (
    <TableCell>
      <div className="flex">
        <TeamLogo logoUrl={team.logoUrl} teamName={team.name} />
        <div className="items-center px-2 text-left text-sm">
          {team.name}
          <p className="text-xs">{shotsOnGoal} SOG</p>
        </div>
      </div>
    </TableCell>
  );
};
