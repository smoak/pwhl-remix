import type {
  StandingsResponse,
  StandingsResponseSectionData,
} from "~/api/types";
import type { Standings, StandingsRecord } from "~/components/types";

const normalizeStandingsRecord = ({
  prop,
  row,
}: StandingsResponseSectionData): StandingsRecord => {
  const teamId = prop.team_code.teamLink;

  return {
    gamesPlayed: parseInt(row.games_played),
    losses: parseInt(row.losses),
    otLosses: parseInt(row.non_reg_losses),
    otWins: parseInt(row.non_reg_wins),
    points: parseInt(row.points),
    pointsPercentage: parseInt(row.percentage),
    regulationWins: parseInt(row.regulation_wins),
    teamAbbrev: row.team_code,
    teamLogoUrl: `https://assets.leaguestat.com/pwhl/logos/50x50/${teamId}.png`,
    teamName: row.name,
  };
};

export const normalizeStandings = (
  standingsResponse: StandingsResponse
): Standings => {
  // for some reason the api returns a weird structure...
  const { data } = standingsResponse[0].sections[0];

  return data.map(normalizeStandingsRecord);
};
