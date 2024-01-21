export type FirebaseRunningClockSnapshot = {
  readonly Clock: {
    readonly Minutes: string;
    readonly Seconds: string;
    readonly Running: boolean;
    readonly period: string;
  };
  readonly DatePlayed: string;
  readonly status_id: number;
};

export type FirebasePublishedClockSnapshot = {
  readonly ClockMinutes: number;
  readonly ClockSeconds: number;
  readonly DatePlayed: string;
  readonly Final: boolean;
  readonly PeriodId: number;
  readonly PeriodLongName: string;
  readonly PeriodShortName: string;
  readonly ProgressString: string;
  readonly Started: boolean;
  readonly StatusId: number;
  readonly StatusName: string;
};

export type PeriodInfo = {
  readonly LongName: string;
  readonly PeriodId: number;
  readonly ShortName: string;
};
export type PeriodsInfo = Record<string, PeriodInfo>;

export type FirebaseGoalsSummarySnapshot = {
  readonly DatePlayed: string;
  readonly HomeAssistPoints: number;
  readonly HomeGoalTotal: number;
  readonly HomeGoalsByPeriod: Record<string, number>;
  readonly PeriodsInfo: PeriodsInfo;
  readonly Shootout: boolean;
  readonly VisitorGoalTotal: number;
  readonly VisitorGoalsByPeriod: Record<string, number>;
};
