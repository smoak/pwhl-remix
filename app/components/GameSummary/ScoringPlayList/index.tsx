import type { ScoringPlay } from "~/components/types";
import { ScoringDetail } from "./ScoringDetail";

type ScoringPlayListProps = {
  readonly scoringPlays: ScoringPlay[];
};

export const ScoringPlayList = ({
  scoringPlays,
}: ScoringPlayListProps): JSX.Element => {
  if (scoringPlays.length === 0) {
    return <span>No Scoring</span>;
  }

  return (
    <>
      {scoringPlays.map((sp) => (
        <ScoringDetail key={sp.timeInPeriod} scoringPlay={sp} />
      ))}
    </>
  );
};
