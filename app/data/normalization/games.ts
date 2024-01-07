import type { GameStatus, ScheduledGame } from "~/api/types";
import type { FinalGame, Game, GameState, LiveGame } from "~/components/types";

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
    };

    return finalGame;
  }

  if (["2", "10"].includes(apiGame.GameStatus)) {
    const liveGame: LiveGame = {
      ...baseGame,
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
