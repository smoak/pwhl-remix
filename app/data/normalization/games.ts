import type { GameStatus, ScheduledGame } from "~/api/types";
import type { FinalGame, Game, GameState, LiveGame } from "~/components/types";
import { normalizeEndState } from "./endState";

const ApiGameStatusToGameState: Record<GameStatus, GameState> = {
  "1": "Scheduled",
  "2": "Live",
  "3": "Final",
  "4": "Final",
  "10": "Live",
};

const normalizeGame = (apiGame: ScheduledGame): Game => {
  const baseGame = {
    id: parseInt(apiGame.ID),
    gameState: ApiGameStatusToGameState[apiGame.GameStatus],
    homeTeam: {
      id: parseInt(apiGame.HomeID),
      name: apiGame.HomeNickname,
      logoUrl: apiGame.HomeLogo,
    },
    visitingTeam: {
      id: parseInt(apiGame.VisitorID),
      name: apiGame.VisitorNickname,
      logoUrl: apiGame.VisitorLogo,
    },
    gameDate: apiGame.GameDateISO8601,
  };

  if (["3", "4"].includes(apiGame.GameStatus)) {
    const finalGame: FinalGame = {
      ...baseGame,
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

type NormalizeGames = (apiGames: ScheduledGame[]) => Game[];
export const normalizeGames: NormalizeGames = (apiGames) =>
  apiGames.map(normalizeGame);
