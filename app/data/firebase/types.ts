export type RunningClockSnapshot = {
  readonly Clock: {
    readonly Minutes: string;
    readonly Seconds: string;
    readonly Running: boolean;
    readonly period: number;
  };
  readonly DatePlayed: string;
  readonly status_id: number;
};

export type PeriodInfo = {
  readonly LongName: string;
  readonly PeriodId: number;
  readonly ShortName: string;
};
export type PeriodsInfo = Record<string, PeriodInfo>;

export type GoalsSummarySnapshot = {
  readonly DatePlayed: string;
  readonly HomeAssistPoints: number;
  readonly HomeGoalTotal: number;
  readonly HomeGoalsByPeriod: Record<string, number>;
  readonly PeriodsInfo: PeriodsInfo;
  readonly Shootout: boolean;
  readonly VisitorGoalTotal: number;
  readonly VisitorGoalsByPeriod: Record<string, number>;
};

export type ShotsSummarySnapshot = {
  readonly DatePlayed: string;
  readonly HomeShotTotal: number;
  readonly HomeShotsByPeriod: Record<string, number>;
  readonly PeriodsInfo: PeriodsInfo;
  readonly VisitorShotTotal: number;
  readonly VisitorShotsByPeriod: Record<string, number>;
};
