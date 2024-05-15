import type {
  BootstrapResponse,
  GameSummaryPeriod,
  GameSummaryPeriodGoal,
  GameSummaryPeriodGoalAssist,
  GameSummaryResponse,
  GameSummaryTeam,
} from "~/api/types";
import type {
  FinalGame,
  GameDetails,
  GamePeriod,
  GameStats,
  GoalType,
  LiveGame,
  ScheduledGame,
  ScoringPlay,
  ScoringPlayAssister,
  ScoringPlays,
  Team,
  TeamStats,
} from "~/components/types";
import { normalizeEndState } from "./endState";
import { normalizeGameType } from "./gameType";

const normalizeFinalGame = (
  { details, homeTeam, periods, visitingTeam }: GameSummaryResponse,
  bootstrapResponse: BootstrapResponse
): FinalGame => {
  const endedInPeriod = parseInt(periods[periods.length - 1].info.id);
  const gameType = normalizeGameType(
    bootstrapResponse.playoffSeasons,
    details.seasonId
  );

  return {
    gameDate: details.GameDateISO8601,
    endedInPeriod,
    type: gameType,
    gameState: "Final",
    homeScore: homeTeam.stats.goals,
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingScore: visitingTeam.stats.goals,
    visitingTeam: normalizeTeam(visitingTeam),
    endState: normalizeEndState({
      gameStatusStringLong: details.status,
      endedInPeriod,
    }),
  };
};

const normalizeTeam = (team: GameSummaryTeam): Team => {
  return {
    id: team.info.id,
    logoUrl: team.info.logo,
    name: team.info.nickname,
    losses: team.seasonStats.teamRecord.losses,
    otLosses: team.seasonStats.teamRecord.OTLosses,
    record: team.seasonStats.teamRecord.formattedRecord,
    wins: team.seasonStats.teamRecord.wins,
  };
};

const normalizeScheduledGame = (
  { details, homeTeam, visitingTeam }: GameSummaryResponse,
  bootstrapResponse: BootstrapResponse
): ScheduledGame => {
  const gameType = normalizeGameType(
    bootstrapResponse.playoffSeasons,
    details.seasonId
  );

  return {
    type: gameType,
    gameDate: details.GameDateISO8601,
    gameState: "Scheduled",
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingTeam: normalizeTeam(visitingTeam),
  };
};

const normalizeTeamStats = (apiTeam: GameSummaryTeam): TeamStats => {
  return {
    score: apiTeam.stats.goals,
    sog: apiTeam.stats.shots,
  };
};

const normalizeGameSummaryPeriod = ({
  info,
  stats,
}: GameSummaryPeriod): GamePeriod => {
  return {
    num: parseInt(info.id),
    ordinalNum: info.longName,
    homeGoals: parseInt(stats.homeGoals),
    homeShotsOnGoal: parseInt(stats.homeShots),
    visitorGoals: parseInt(stats.visitingGoals),
    visitorShotsOnGoal: parseInt(stats.visitingShots),
  };
};

const normalizeGameStats = (apiGameSummary: GameSummaryResponse): GameStats => {
  return {
    homeTeam: normalizeTeamStats(apiGameSummary.homeTeam),
    visitingTeam: normalizeTeamStats(apiGameSummary.visitingTeam),
    periods: apiGameSummary.periods.map(normalizeGameSummaryPeriod),
    scoringPlays: normalizeScoringDetails(
      apiGameSummary.periods,
      apiGameSummary.shootoutDetails
    ),
  };
};

const normalizeClockTime = (status: string): string => {
  if (!status.includes("In Progress")) {
    return "0:00";
  }

  return status.substring(13, 18).trim();
};

const normalizeLiveGame = (
  { details, homeTeam, periods, visitingTeam }: GameSummaryResponse,
  bootstrapResponse: BootstrapResponse
): LiveGame => {
  const period = parseInt(periods[periods.length - 1].info.id);
  const clockTime = normalizeClockTime(details.status);
  const gameType = normalizeGameType(
    bootstrapResponse.playoffSeasons,
    details.seasonId
  );

  return {
    gameDate: details.GameDateISO8601,
    type: gameType,
    gameState: "Live",
    gameClock: {
      clockTime,
      isInIntermission:
        details.status.includes("Intermission") || clockTime === "0:00",
      period,
    },
    homeScore: homeTeam.stats.goals,
    visitingScore: visitingTeam.stats.goals,
    homeTeam: normalizeTeam(homeTeam),
    id: details.id,
    visitingTeam: normalizeTeam(visitingTeam),
  };
};

const normalizeAssist = (
  assist?: GameSummaryPeriodGoalAssist,
  seasonAssists?: number
): ScoringPlayAssister | undefined => {
  if (!assist || !seasonAssists) {
    return;
  }

  return {
    firstName: assist.firstName,
    id: assist.id,
    lastName: assist.lastName,
    seasonAssists,
  };
};

const normalizeGoalType = ({
  isEmptyNet,
  isPowerPlay,
  isShortHanded,
}: GameSummaryPeriodGoal["properties"]): GoalType => {
  if (isEmptyNet === "1") {
    return "EmptyNet";
  }

  if (isPowerPlay === "1") {
    return "PowerPlay";
  }

  if (isShortHanded === "1") {
    return "ShortHanded";
  }

  return "Even";
};

const normalizeScoringPlay = ({
  goals,
  info,
  stats,
}: GameSummaryPeriod): ScoringPlay[] => {
  const periodNum = parseInt(info.id);
  return goals.map<ScoringPlay>((goal) => {
    const primaryAssist = normalizeAssist(
      goal.assists[0],
      parseInt(goal.assistNumbers[0])
    );
    const secondaryAssist = normalizeAssist(
      goal.assists[1],
      parseInt(goal.assistNumbers[1])
    );

    return {
      goalScorer: {
        id: goal.scoredBy.id,
        firstName: goal.scoredBy.firstName,
        headshotUrl: goal.scoredBy.playerImageURL,
        lastName: goal.scoredBy.lastName,
        seasonGoals: parseInt(goal.scorerGoalNumber),
      },
      period: periodNum,
      scoringTeam: {
        id: goal.team.id,
        logoUrl: goal.team.logo,
        name: goal.team.name,
      },
      timeInPeriod: goal.time,
      primaryAssist,
      secondaryAssist,
      goalType: normalizeGoalType(goal.properties),
    };
  });
};

const normalizeOvertimeScoringPlay = (
  period?: GameSummaryPeriod
): ScoringPlays["overtime"] => {
  if (!period) {
    return;
  }

  const overtime = normalizeScoringPlay(period);

  return {
    otPeriod: parseInt(period.info.id) - 3,
    scoringPlay: overtime[0],
  };
};

const normalizeShootoutScoringPlay = (
  shootoutDetails: GameSummaryResponse["shootoutDetails"]
): ScoringPlays["shootout"] => {
  if (!shootoutDetails) {
    return;
  }

  const { homeTeamShots, visitingTeamShots } = shootoutDetails;

  const winningShot = [...homeTeamShots, ...visitingTeamShots].find(
    (s) => s.isGameWinningGoal
  );

  if (winningShot != null) {
    return {
      goalScorer: {
        id: winningShot.shooter.id,
        firstName: winningShot.shooter.firstName,
        lastName: winningShot.shooter.lastName,
        headshotUrl: winningShot.shooter.playerImageURL,
        seasonGoals: 0,
      },
      goalType: "Even",
      period: 4,
      scoringTeam: {
        id: winningShot.shooterTeam.id,
        logoUrl: winningShot.shooterTeam.logo,
        name: winningShot.shooterTeam.name,
      },
      timeInPeriod: "",
    };
  }
};

const normalizeScoringDetails = (
  periods: GameSummaryResponse["periods"],
  shootoutDetails: GameSummaryResponse["shootoutDetails"]
): ScoringPlays => {
  const firstPeriod = periods
    .filter((p) => parseInt(p.info.id) === 1)
    .flatMap(normalizeScoringPlay);
  const secondPeriod = periods
    .filter((p) => parseInt(p.info.id) === 2)
    .flatMap(normalizeScoringPlay);
  const thirdPeriod = periods
    .filter((p) => parseInt(p.info.id) === 3)
    .flatMap(normalizeScoringPlay);
  const otScoring = periods.find(
    (p) => p.goals.length > 0 && p.info.shortName.startsWith("OT")
  );

  return {
    firstPeriod,
    secondPeriod,
    thirdPeriod,
    overtime: normalizeOvertimeScoringPlay(otScoring),
    shootout: normalizeShootoutScoringPlay(shootoutDetails),
  };
};

type NormalizeGameDetails = (
  apiGameSummary: GameSummaryResponse,
  bootstrapResponse: BootstrapResponse
) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (
  apiGameSummary,
  bootstrapResponse
) => {
  if (
    apiGameSummary.details.final === "1" ||
    apiGameSummary.details.status === "Unofficial Final"
  ) {
    return {
      game: normalizeFinalGame(apiGameSummary, bootstrapResponse),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  if (
    apiGameSummary.details.started === "0" &&
    apiGameSummary.details.final === "0"
  ) {
    return {
      game: normalizeScheduledGame(apiGameSummary, bootstrapResponse),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  return {
    game: normalizeLiveGame(apiGameSummary, bootstrapResponse),
    gameStats: normalizeGameStats(apiGameSummary),
  };
};
