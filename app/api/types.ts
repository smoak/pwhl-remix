export type GameStatus = "1" | "2" | "3" | "4" | "10";

export type ScheduledGame = {
  readonly ID: string;
  readonly SeasonID: string;
  readonly Date: string;
  readonly GameDateISO8601: string;
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

type HeadToHeadRecord = {
  readonly wins: number;
  readonly losses: number;
  readonly ties: number;
  readonly OTWins: number;
  readonly OTLosses: number;
  readonly SOLosses: number;
  readonly formattedRecord: string;
};

type HeadToHeadTeamRecords = {
  readonly currentYear: HeadToHeadRecord;
  readonly previousFiveYears: HeadToHeadRecord;
  readonly previousYear: HeadToHeadRecord;
};

export type GameCenterPreviewPreviousMeeting = {
  readonly gameId: string;
  readonly datePlayed: string;
  readonly game_date_iso_8601: string;
  readonly homeCity: string;
  readonly homeScore: string;
  readonly homeTeamId: string;
  readonly status: string;
  readonly visitingCity: string;
  readonly visitingScore: string;
  readonly visitingTeamId: string;
};

export type GameCenterPreviewResponse = {
  readonly headToHeadRecords: {
    readonly homeTeam: HeadToHeadTeamRecords;
    readonly visitingTeam: HeadToHeadTeamRecords;
  };
  readonly homeTeam: {};
  readonly lineupPairingReport: unknown | null;
  readonly previousMeetings: GameCenterPreviewPreviousMeeting[];
  readonly visitingTeam: {};
};

export type BootstrapResponse = {
  readonly firebaseUrl: string;
  readonly firebaseToken: string;
  readonly firebaseApiKey: string;
  readonly regularSeasons: Season[];
  readonly playoffSeasons: Season[];
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
  readonly penaltyShots: {
    readonly homeTeam: unknown[];
    readonly visitingTeam: unknown[];
  };
};

type Season = {
  readonly id: string;
  readonly name: string;
};
