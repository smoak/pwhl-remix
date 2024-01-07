import { TeamLogo } from "~/components/TeamLogo";

export type TeamInfoProps = {
  readonly logoUrl: string;
  readonly teamName: string;
};

export const TeamInfo = ({ logoUrl, teamName }: TeamInfoProps) => (
  <div className="flex w-1/3 flex-col items-center text-center">
    <TeamLogo logoUrl={logoUrl} teamName={teamName} size="md" />
    {teamName}
  </div>
);
