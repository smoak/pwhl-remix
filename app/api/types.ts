export type GameStatus = "1" | "2" | "3" | "4" | "10";

export type ScheduledGame = {
  readonly ID: string;
  readonly SeasonID: string;
  readonly Date: string;
  readonly GameDateISO8601: string;
  readonly ScheduledTime: string;
  readonly ScheduledFormattedTime: string;
  readonly Timezone: string;
  readonly HomeID: string;
  readonly HomeCode: string;
  readonly HomeCity: string;
  readonly HomeNickname: string;
  readonly HomeLongName: string;
  readonly HomeDivision: string;
  readonly HomeGoals: string;
  readonly HomeLogo: string;
  readonly HomeWins: string;
  readonly HomeRegulationLosses: string;
  readonly HomeOTLosses: string;
  readonly VisitorID: string;
  readonly VisitorCode: string;
  readonly VisitorCity: string;
  readonly VisitorNickname: string;
  readonly VisitorLongName: string;
  readonly VisitorDivision: string;
  readonly VisitorGoals: string;
  readonly VisitorLogo: string;
  readonly VisitorWins: string;
  readonly VisitorRegulationLosses: string;
  readonly VisitorOTLosses: string;
  readonly GameStatusString: string;
  readonly GameStatusStringLong: string;
  readonly GameStatus: GameStatus;
  readonly GameClock: string;
  readonly Period: string;
  readonly Intermission: string;
};

export type ModulekitResponse = {
  readonly SiteKit: {
    readonly Scorebar: ScheduledGame[];
  };
};

export type GameSummaryDetails = {
  readonly id: number;
  readonly date: string;
  readonly gameNumber: string;
  readonly startTime: string;
  readonly started: string;
  readonly final: string;
  readonly status: string;
  readonly seasonId: string;
  readonly GameDateISO8601: string;
};

export type GameSummaryPeriodGoalAssist = {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly playerImageURL: string;
};

export type GameSummaryPeriodGoal = {
  readonly game_goal_id: string;
  readonly team: {
    readonly id: number;
    readonly name: string;
    readonly nickname: string;
    readonly abbreviation: string;
    readonly logo: string;
  };
  readonly period: {
    readonly id: string;
    readonly shortName: string;
    readonly longName: string;
  };
  readonly time: string;
  readonly scorerGoalNumber: string;
  readonly scoredBy: {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly playerImageURL: string;
  };
  readonly assists: GameSummaryPeriodGoalAssist[];
  readonly assistNumbers: string[];
  readonly properties: {
    readonly isPowerPlay: string;
    readonly isShortHanded: string;
    readonly isEmptyNet: string;
    readonly isPenaltyShot: string;
    readonly isInsuranceGoal: string;
    readonly isGameWinningGoal: string;
  };
};

export type GameSummaryPeriod = {
  readonly info: {
    readonly id: string;
    readonly shortName: string;
    readonly longName: string;
  };
  readonly stats: {
    readonly homeGoals: string;
    readonly homeShots: string;
    readonly visitingGoals: string;
    readonly visitingShots: string;
  };
  readonly goals: GameSummaryPeriodGoal[];
};

export type GameSummaryTeam = {
  readonly info: {
    readonly id: number;
    readonly name: string;
    readonly city: string;
    readonly nickname: string;
    readonly abbreviation: string;
    readonly logo: string;
  };
  readonly stats: {
    readonly shots: number;
    readonly goals: number;
  };
  readonly seasonStats: {
    readonly seasonId: null;
    readonly teamRecord: {
      readonly wins: number;
      readonly losses: number;
      readonly ties: number;
      readonly OTWins: number;
      readonly OTLosses: number;
      readonly SOLosses: number;
      readonly formattedRecord: string;
    };
    readonly teamStats: unknown[];
  };
};

export type GameSummaryResponse = {
  readonly details: GameSummaryDetails;
  readonly hasShooutout: boolean;
  readonly homeTeam: GameSummaryTeam;
  readonly visitingTeam: GameSummaryTeam;
  readonly periods: GameSummaryPeriod[];
};

export type StandingsResponseSectionData = {
  readonly prop: {
    readonly team_code: {
      readonly teamLink: string;
    };
    readonly name: {
      readonly teamLink: string;
    };
  };
  readonly row: {
    readonly team_code: string;
    readonly losses: string;
    readonly regulation_wins: string;
    readonly points: string;
    readonly goals_for: string;
    readonly goals_against: string;
    readonly non_reg_wins: string;
    readonly non_reg_losses: string;
    readonly games_remaining: string;
    readonly percentage: string;
    readonly overall_rank: string;
    readonly games_played: string;
    readonly rank: number;
    readonly name: string;
  };
};

export type StandingsResponseSection = {
  readonly title: string;
  readonly headers: object;
  readonly data: StandingsResponseSectionData[];
};

export type StandingsResponseObject = {
  readonly sections: StandingsResponseSection[];
};

export type StandingsResponse = StandingsResponseObject[];
