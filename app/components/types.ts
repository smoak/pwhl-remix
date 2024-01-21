export type GameState = "Live" | "Scheduled" | "Final";

export type EndState = "Regulation" | "OT" | "SO";

export type Game = LiveGame | ScheduledGame | FinalGame;

type BaseGame = {
  readonly id: number;
  readonly homeTeam: Team;
  readonly visitingTeam: Team;
  readonly gameState: GameState;
  readonly gameDate: string;
};

export type GameClock = {
  readonly period: number;
  readonly isInIntermission: boolean;
  readonly clockTime: string;
};

export type LiveGame =
  | BaseGame & {
      readonly gameState: "Live";
      readonly homeScore: number;
      readonly visitingScore: number;
      readonly gameClock: GameClock;
    };

export type FinalGame =
  | BaseGame & {
      readonly gameState: "Final";
      readonly homeScore: number;
      readonly visitingScore: number;
      readonly endState: EndState;
    };

export type ScheduledGame =
  | BaseGame & {
      readonly gameState: "Scheduled";
    };

export type Team = {
  readonly id: number;
  readonly name: string;
  readonly logoUrl: string;
};

export const isLiveGame = (g: Game): g is LiveGame => {
  return g.gameState === "Live";
};

export const isFinalGame = (g: Game): g is FinalGame => {
  return g.gameState === "Final";
};

export const isScheduledGame = (g: Game): g is ScheduledGame => {
  return g.gameState === "Scheduled";
};
