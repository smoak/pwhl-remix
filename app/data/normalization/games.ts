import type { BootstrapResponse, GameStatus, ScheduledGame } from "~/api/types";
import type {
  FinalGame,
  Game,
  GameState,
  LiveGame,
  Team,
} from "~/components/types";
import { normalizeEndState } from "./endState";
import { normalizeGameType } from "./gameType";

const ApiGameStatusToGameState: Record<GameStatus, GameState> = {
  "1": "Scheduled",
  "2": "Live",
  "3": "Final",
  "4": "Final",
  "10": "Live",
};

const normalizeRecord = ({
  losses,
  otLosses,
  wins,
}: Pick<Team, "wins" | "otLosses" | "losses">) => {
  return [wins, losses, otLosses].join("-");
};

const normalizeHomeTeam = (apiGame: ScheduledGame): Team => {
  const wins = parseInt(apiGame.HomeWins);
  const losses = parseInt(apiGame.HomeRegulationLosses);
  const otLosses = parseInt(apiGame.HomeOTLosses);

  return {
    id: parseInt(apiGame.HomeID),
    name: apiGame.HomeNickname,
    logoUrl: apiGame.HomeLogo,
    wins,
    losses,
    otLosses,
    record: normalizeRecord({ losses, otLosses, wins }),
  };
};

const normalizeVisitingTeam = (apiGame: ScheduledGame): Team => {
  const wins = parseInt(apiGame.VisitorWins);
  const losses = parseInt(apiGame.VisitorRegulationLosses);
  const otLosses = parseInt(apiGame.VisitorOTLosses);

  return {
    id: parseInt(apiGame.VisitorID),
    name: apiGame.VisitorNickname,
    logoUrl: apiGame.VisitorLogo,
    wins: parseInt(apiGame.VisitorWins),
    losses: parseInt(apiGame.VisitorRegulationLosses),
    otLosses: parseInt(apiGame.VisitorOTLosses),
    record: normalizeRecord({ losses, otLosses, wins }),
  };
};

const normalizeGame = (
  apiGame: ScheduledGame,
  bootstrapResponse: BootstrapResponse
): Game => {
  const baseGame = {
    type: normalizeGameType(bootstrapResponse.playoffSeasons, apiGame.SeasonID),
    id: parseInt(apiGame.ID),
    gameState: ApiGameStatusToGameState[apiGame.GameStatus],
    homeTeam: normalizeHomeTeam(apiGame),
    visitingTeam: normalizeVisitingTeam(apiGame),
    gameDate: apiGame.GameDateISO8601,
  };

  if (["3", "4"].includes(apiGame.GameStatus)) {
    const endedInPeriod = parseInt(apiGame.Period);

    const finalGame: FinalGame = {
      ...baseGame,
      endedInPeriod,
      homeScore: parseInt(apiGame.HomeGoals),
      visitingScore: parseInt(apiGame.VisitorGoals),
      gameState: "Final",
      endState: normalizeEndState({
        gameStatusStringLong: apiGame.GameStatusStringLong,
        endedInPeriod: parseInt(apiGame.Period),
      }),
    };

    return finalGame;
  }

  if (["2", "10"].includes(apiGame.GameStatus)) {
    const liveGame: LiveGame = {
      ...baseGame,
      homeScore: parseInt(apiGame.HomeGoals),
      visitingScore: parseInt(apiGame.VisitorGoals),
      gameClock: {
        clockTime: apiGame.GameClock,
        period: parseInt(apiGame.Period),
        isInIntermission:
          apiGame.Intermission === "1" || apiGame.GameClock === "00:00",
      },
      gameState: "Live",
    };
    return liveGame;
  }

  return {
    ...baseGame,
    gameState: "Scheduled",
  };
};

type NormalizeGames = (
  apiGames: ScheduledGame[],
  bootstrapResponse: BootstrapResponse
) => Game[];
export const normalizeGames: NormalizeGames = (apiGames, bootstrapResponse) =>
  apiGames
    .filter((game) => game.VisitorCode !== "TBD" && game.HomeCode !== "TBD")
    .map((game) => normalizeGame(game, bootstrapResponse));
