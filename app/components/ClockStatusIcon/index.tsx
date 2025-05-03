import { WhistleIcon } from "../WhistleIcon";
import { ZambonieIcon } from "../ZambonieIcon";

type ClockStatusIconProps = {
  readonly isWhistle: boolean;
  readonly isIntermission: boolean;
};

export const ClockStatusIcon = ({
  isWhistle,
  isIntermission,
}: ClockStatusIconProps) => {
  if (isIntermission) {
    return (
      <span className="flex max-h-6 justify-center">
        <ZambonieIcon />
      </span>
    );
  }

  if (isWhistle) {
    return (
      <span className="flex justify-center">
        <WhistleIcon />
      </span>
    );
  }

  return null;
};
