import { PeriodOrdinal } from "~/components/PeriodOrdinal";
import type { ScoringPlay } from "~/components/types";
import { ScoringPlayList } from "../ScoringPlayList";

type PeriodScoringSummaryProps = {
  readonly periodNumber: number;
  readonly scoringPlays: ScoringPlay[];
};

export const PeriodScoringSummary = ({
  periodNumber,
  scoringPlays,
}: PeriodScoringSummaryProps): JSX.Element => {
  return (
    <>
      <div className="my-5 border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={periodNumber} /> period
      </div>
      <ScoringPlayList scoringPlays={scoringPlays} />
    </>
  );
};
