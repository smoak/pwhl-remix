import type { ScoringPlays } from "~/components/types";
import { PeriodScoringSummary } from "../PeriodScoringSummary";
import { OvertimePeriodScoringSummary } from "../OvertimePeriodScoringSummary";
import { ShootoutScoringSummary } from "../ShootoutScoringSummary";

type ScoringSectionProps = {
  readonly scoringPlays: ScoringPlays;
};

export const ScoringSection = ({ scoringPlays }: ScoringSectionProps) => {
  return (
    <section>
      <h1 className="text-2xl font-bold">Scoring</h1>
      <PeriodScoringSummary
        periodNumber={1}
        scoringPlays={scoringPlays.firstPeriod}
      />
      <PeriodScoringSummary
        periodNumber={2}
        scoringPlays={scoringPlays.secondPeriod}
      />
      <PeriodScoringSummary
        periodNumber={3}
        scoringPlays={scoringPlays.thirdPeriod}
      />
      <OvertimePeriodScoringSummary scoringPlay={scoringPlays.overtime} />
      <ShootoutScoringSummary scoringPlay={scoringPlays.shootout} />
    </section>
  );
};
