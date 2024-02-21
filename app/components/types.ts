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

export type TeamStats = {
  readonly score: number;
  readonly sog: number;
};

export type GamePeriod = {
  readonly ordinalNum: string;
  readonly num: number;
  readonly visitorGoals: number;
  readonly visitorShotsOnGoal: number;
  readonly homeGoals: number;
  readonly homeShotsOnGoal: number;
};

export type GoalScorer = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly headshotUrl: string;
  readonly seasonGoals: number;
};

export type ScoringPlayAssister = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly seasonAssists: number;
};

export type GoalType = "Even" | "ShortHanded" | "PowerPlay" | "EmptyNet";

export type ScoringPlay = {
  readonly period: number;
  readonly timeInPeriod: string;
  readonly goalScorer: GoalScorer;
  readonly scoringTeam: {
    readonly id: number;
    readonly logoUrl: string;
    readonly name: string;
  };
  readonly goalType: GoalType;
  readonly primaryAssist?: ScoringPlayAssister;
  readonly secondaryAssist?: ScoringPlayAssister;
};
export type ScoringPlays = Record<number, ScoringPlay[]>;

export type GameStats = {
  readonly homeTeam: TeamStats;
  readonly visitingTeam: TeamStats;
  readonly periods: GamePeriod[];
  readonly scoringPlays: ScoringPlays;
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

export type GameDetails = {
  readonly game: Game;
  readonly gameStats: GameStats;
};

export type StandingsRecord = {
  readonly teamAbbrev: string;
  readonly teamName: string;
  readonly teamLogoUrl: string;
  readonly gamesPlayed: number;
  readonly wins: number;
  readonly regulationWins: number;
  readonly losses: number;
  readonly otLosses: number;
  readonly points: number;
  readonly pointsPercentage: number;
};

export type Standings = StandingsRecord[];
