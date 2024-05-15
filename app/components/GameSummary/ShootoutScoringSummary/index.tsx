import type { ScoringPlay } from "~/components/types";
import { PlayerAvatar } from "~/components/PlayerAvatar";
import { TeamLogo } from "~/components/TeamLogo";

type ShootoutScoringSummaryProps = {
  readonly scoringPlay?: ScoringPlay;
};
export const ShootoutScoringSummary = ({
  scoringPlay,
}: ShootoutScoringSummaryProps) => {
  if (!scoringPlay) {
    return null;
  }
  const { goalScorer, scoringTeam } = scoringPlay;
  const goalScorerName = [goalScorer.firstName, goalScorer.lastName].join(" ");

  return (
    <>
      <div className="my-5 border-b-2 border-pwhl-purple-50 bg-pwhl-purple-50 px-6 py-3 font-bold text-white">
        S/O Winner
      </div>
      <div className="flex flex-col pb-4">
        <div className="flex min-h-36 flex-col gap-2 rounded-lg border border-pwhl-purple-50 bg-white p-4">
          <div className="flex items-center gap-2">
            <PlayerAvatar
              headshotUrl={goalScorer.headshotUrl}
              playerName={goalScorerName}
            />
            <div className="flex flex-col whitespace-nowrap sm:w-48 md:w-80 lg:w-48">
              <span className="font-bold">{goalScorerName}</span>
              <span className="flex flex-row items-center gap-2">
                <TeamLogo
                  size="sm"
                  logoUrl={scoringTeam.logoUrl}
                  teamName={scoringTeam.name}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
