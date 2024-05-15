import type { OvertimeScoringPlay } from "~/components/types";
import { ScoringPlayList } from "../ScoringPlayList";
import { PeriodOrdinal } from "~/components/PeriodOrdinal";

type OvertimePeriodScoringSummaryProps = {
  readonly scoringPlay?: OvertimeScoringPlay;
};

export const OvertimePeriodScoringSummary = ({
  scoringPlay,
}: OvertimePeriodScoringSummaryProps) => {
  if (scoringPlay == null) {
    return null;
  }

  const { otPeriod, scoringPlay: otScoringPlay } = scoringPlay;

  if (otPeriod === 1) {
    return (
      <>
        <div className="my-5 border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
          Overtime
        </div>
        <ScoringPlayList scoringPlays={[otScoringPlay]} />
      </>
    );
  }

  return (
    <>
      <div className="my-5 border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        <PeriodOrdinal period={otPeriod} /> Overtime
      </div>
      <ScoringPlayList scoringPlays={[otScoringPlay]} />
    </>
  );
};
