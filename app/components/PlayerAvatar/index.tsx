type PlayerAvatarProps = {
  readonly headshotUrl: string;
  readonly playerName: string;
};

export const PlayerAvatar = ({
  headshotUrl,
  playerName,
}: PlayerAvatarProps) => {
  return (
    <div className="inline-block h-14 w-14 overflow-hidden rounded-full border border-solid border-black">
      <img alt={playerName} src={headshotUrl} />
    </div>
  );
};
