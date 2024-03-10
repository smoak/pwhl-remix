import type {
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
  TeamStats,
} from "~/components/types";
import { normalizeEndState } from "./endState";

const normalizeFinalGame = ({
  details,
  homeTeam,
  periods,
  visitingTeam,
}: GameSummaryResponse): FinalGame => {
  const endedInPeriod = parseInt(periods[periods.length - 1].info.id);

  return {
    gameDate: details.GameDateISO8601,
    gameState: "Final",
    homeScore: homeTeam.stats.goals,
    homeTeam: {
      id: homeTeam.info.id,
      logoUrl: homeTeam.info.logo,
      name: homeTeam.info.nickname,
    },
    id: details.id,
    visitingScore: visitingTeam.stats.goals,
    visitingTeam: {
      id: visitingTeam.info.id,
      logoUrl: visitingTeam.info.logo,
      name: visitingTeam.info.nickname,
    },
    endState: normalizeEndState({
      gameStatusStringLong: details.status,
      endedInPeriod,
    }),
  };
};

const normalizeScheduledGame = ({
  details,
  homeTeam,
  visitingTeam,
}: GameSummaryResponse): ScheduledGame => {
  return {
    gameDate: details.GameDateISO8601,
    gameState: "Scheduled",
    homeTeam: {
      id: homeTeam.info.id,
      logoUrl: homeTeam.info.logo,
      name: homeTeam.info.nickname,
    },
    id: details.id,
    visitingTeam: {
      id: visitingTeam.info.id,
      logoUrl: visitingTeam.info.logo,
      name: visitingTeam.info.nickname,
    },
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
    scoringPlays: normalizeScoringDetails(apiGameSummary.periods),
  };
};

const normalizeClockTime = (status: string): string => {
  if (!status.includes("In Progress")) {
    return "0:00";
  }

  return status.substring(13, 18).trim();
};

const normalizeLiveGame = ({
  details,
  homeTeam,
  periods,
  visitingTeam,
}: GameSummaryResponse): LiveGame => {
  const period = parseInt(periods[periods.length - 1].info.id);
  const clockTime = normalizeClockTime(details.status);

  return {
    gameDate: details.GameDateISO8601,
    gameState: "Live",
    gameClock: {
      clockTime,
      isInIntermission:
        details.status.includes("Intermission") || clockTime === "0:00",
      period,
    },
    homeScore: homeTeam.stats.goals,
    visitingScore: visitingTeam.stats.goals,
    homeTeam: {
      id: homeTeam.info.id,
      logoUrl: homeTeam.info.logo,
      name: homeTeam.info.nickname,
    },
    id: details.id,
    visitingTeam: {
      id: visitingTeam.info.id,
      logoUrl: visitingTeam.info.logo,
      name: visitingTeam.info.nickname,
    },
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

const normalizeScoringDetails = (periods: GameSummaryResponse["periods"]) => {
  return periods.reduce<ScoringPlays>((accum, scoring) => {
    const periodNum = parseInt(scoring.info.id);
    accum[periodNum] = scoring.goals.map<ScoringPlay>((goal) => {
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

    return accum;
  }, {});
};

type NormalizeGameDetails = (
  apiGameSummary: GameSummaryResponse
) => GameDetails;
export const normalizeGameDetails: NormalizeGameDetails = (apiGameSummary) => {
  if (
    apiGameSummary.details.final === "1" ||
    apiGameSummary.details.status === "Unofficial Final"
  ) {
    return {
      game: normalizeFinalGame(apiGameSummary),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  if (
    apiGameSummary.details.started === "0" &&
    apiGameSummary.details.final === "0"
  ) {
    return {
      game: normalizeScheduledGame(apiGameSummary),
      gameStats: normalizeGameStats(apiGameSummary),
    };
  }

  return {
    game: normalizeLiveGame(apiGameSummary),
    gameStats: normalizeGameStats(apiGameSummary),
  };
};
