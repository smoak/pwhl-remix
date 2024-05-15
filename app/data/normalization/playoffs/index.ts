import type {
  PlayoffBracketResponse,
  PlayoffBracketRound,
  PlayoffTeams,
  PlayoffMatchup as ApiPlayoffMatchup,
} from "~/api/types";
import type {
  PlayoffBracket,
  PlayoffMatchup,
  PlayoffRound,
} from "~/components/types";

const normalizeMatchup = (
  m: ApiPlayoffMatchup,
  teams: PlayoffTeams
): PlayoffMatchup => {
  const highSeedTeam = teams[m.team1];
  const lowSeedTeam = teams[m.team2];
  const highSeedWins = m.team1_wins;
  const lowSeedWins = m.team2_wins;

  return {
    id: m.series_letter,
    highSeed: {
      abbrev: highSeedTeam.team_code,
      id: highSeedTeam.id,
      logo: highSeedTeam.logo,
      name: highSeedTeam.name,
      seriesWins: highSeedWins,
    },
    lowSeed: {
      abbrev: lowSeedTeam.team_code,
      id: lowSeedTeam.id,
      logo: lowSeedTeam.logo,
      name: lowSeedTeam.name,
      seriesWins: lowSeedWins,
    },
  };
};

const normalizePlayoffRound = (
  round: PlayoffBracketRound,
  teams: PlayoffTeams
): PlayoffRound => {
  const id = parseInt(round.round);
  const matchups = round.matchups
    .filter((r) => r.games.length > 0)
    .map((m) => normalizeMatchup(m, teams));

  return {
    id,
    hasStarted: round.matchups.some((r) => r.team1 !== "0" && r.team2 !== "0"),
    matchups,
    name: round.round_name,
    roundNumber: id,
  };
};

export const normalizePlayoffBracket = ({
  SiteKit,
}: PlayoffBracketResponse): PlayoffBracket => {
  const { Brackets } = SiteKit;
  const { rounds, teams } = Brackets;

  return { rounds: rounds.map((round) => normalizePlayoffRound(round, teams)) };
};
