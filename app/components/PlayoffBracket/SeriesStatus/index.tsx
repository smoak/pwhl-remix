import type { PlayoffTeam } from "~/components/types";

type SeriesStatusProps = {
  readonly highSeed: PlayoffTeam;
  readonly lowSeed: PlayoffTeam;
};
export const SeriesStatus = ({ highSeed, lowSeed }: SeriesStatusProps) => {
  if (highSeed.seriesWins === lowSeed.seriesWins) {
    return <span className="flex justify-center text-center">Series Tied</span>;
  }

  if (highSeed.seriesWins === 3) {
    return (
      <span className="flex justify-center text-center">
        {highSeed.abbrev} wins series
      </span>
    );
  }

  if (lowSeed.seriesWins === 3) {
    return (
      <span className="flex justify-center text-center">
        {lowSeed.abbrev} wins series
      </span>
    );
  }

  if (highSeed.seriesWins > lowSeed.seriesWins) {
    return (
      <span className="flex justify-center text-center">
        {highSeed.abbrev} leads series
      </span>
    );
  }

  return (
    <span className="flex justify-center">{lowSeed.abbrev} leads series</span>
  );
};
