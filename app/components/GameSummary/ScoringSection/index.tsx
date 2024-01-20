import type { ScoringPlays } from "~/components/types";
import { PeriodScoringSummary } from "../PeriodScoringSummary";
import { OvertimePeriodScoringSummary } from "../OvertimePeriodScoringSummary";

type ScoringSectionProps = {
  readonly scoringPlays: ScoringPlays;
};

export const ScoringSection = ({ scoringPlays }: ScoringSectionProps) => {
  const firstPeriod = scoringPlays[1] ?? [];
  const secondPeriod = scoringPlays[2] ?? [];
  const thirdPeriod = scoringPlays[3] ?? [];

  return (
    <section>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary periodNumber={1} scoringPlays={firstPeriod} />
      <PeriodScoringSummary periodNumber={2} scoringPlays={secondPeriod} />
      <PeriodScoringSummary periodNumber={3} scoringPlays={thirdPeriod} />
      <OvertimePeriodScoringSummary scoringPlays={scoringPlays[4] ?? []} />
    </section>
  );
};
