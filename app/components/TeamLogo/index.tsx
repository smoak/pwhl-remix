import type { Sizes, SizeMap } from "../sizes";

export type TeamLogoProps = {
  readonly logoUrl: string;
  readonly teamName: string;
  readonly size?: Sizes;
};

const widthVariants: SizeMap = {
  lg: "64px",
  md: "48px",
  sm: "32px",
};
const heightVariants: SizeMap = {
  lg: "64px",
  md: "48px",
  sm: "32px",
};

export const TeamLogo = ({
  logoUrl,
  teamName,
  size = "sm",
}: TeamLogoProps): JSX.Element => {
  const sizeVariants: SizeMap = {
    lg: "h-16 w-16",
    md: "h-12 w-12",
    sm: "h-8 w-8",
  };
  return (
    <img
      src={logoUrl}
      alt={`the ${teamName} team logo`}
      className={`${sizeVariants[size]}`}
      width={widthVariants[size]}
      height={heightVariants[size]}
    />
  );
};
