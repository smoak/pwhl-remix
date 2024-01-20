import { PlayerAvatar } from "~/components/PlayerAvatar";
import { TeamLogo } from "~/components/TeamLogo";
import type { ScoringPlay } from "~/components/types";
import { AssistInfo } from "../AssistInfo";
import { ScoringType } from "../ScoringType";

type ScoringDetailProps = {
  readonly scoringPlay: ScoringPlay;
};

export const ScoringDetail = ({
  scoringPlay,
}: ScoringDetailProps): JSX.Element => {
  const {
    goalScorer,
    scoringTeam,
    timeInPeriod,
    primaryAssist,
    secondaryAssist,
    goalType,
  } = scoringPlay;
  const goalScorerName = [goalScorer.firstName, goalScorer.lastName].join(" ");

  return (
    <div className="flex flex-col pb-4">
      <div className="flex flex-col gap-2 rounded-lg border border-pwhl-purple-50 bg-white p-4">
        <div className="flex items-center gap-2">
          <PlayerAvatar
            headshotUrl={goalScorer.headshotUrl}
            playerName={goalScorerName}
          />
          <div className="flex flex-col whitespace-nowrap sm:w-48 md:w-80 lg:w-48">
            <span className="font-bold">
              {goalScorerName} ({goalScorer.seasonGoals})
            </span>
            <span className="flex flex-row items-center gap-2">
              <TeamLogo
                size="sm"
                logoUrl={scoringTeam.logoUrl}
                teamName={scoringTeam.name}
              />
              <AssistInfo
                primaryAssist={primaryAssist}
                secondaryAssist={secondaryAssist}
              />
            </span>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="flex flex-col">
            Time
            <div className="font-bold">{timeInPeriod}</div>
          </div>
          <ScoringType goalType={goalType} />
        </div>
      </div>
    </div>
  );
};
