import type { ScoringPlay } from "~/components/types";
import { ScoringPlayList } from "../ScoringPlayList";

type OvertimePeriodScoringSummaryProps = {
  readonly scoringPlays: ScoringPlay[];
};

export const OvertimePeriodScoringSummary = ({
  scoringPlays,
}: OvertimePeriodScoringSummaryProps) => {
  if (scoringPlays.length === 0) {
    return null;
  }

  return (
    <>
      <div className="my-5 border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        Overtime
      </div>
      <ScoringPlayList scoringPlays={scoringPlays} />
    </>
  );
};
