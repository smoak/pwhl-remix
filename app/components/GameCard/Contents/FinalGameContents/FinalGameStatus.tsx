import type { GameType } from "~/components/types";

type FinalGameStatusProps = {
  readonly gameType: GameType;
  readonly endedInPeriod: number;
};

const FinalOvertime = ({ otPeriods }: { otPeriods: number }) => {
  if (otPeriods === 1) {
    return (
      <>
        <span className="mx-auto block">Final/OT</span>
        <span className="mx-auto block pt-6"></span>
      </>
    );
  }

  return (
    <>
      <span className="mx-auto block">Final/{otPeriods}OT</span>
      <span className="mx-auto block pt-6"></span>
    </>
  );
};

const FinalShootout = () => (
  <>
    <span className="mx-auto block">Final/SO</span>
    <span className="mx-auto block pt-6"></span>
  </>
);

export const FinalGameStatus = ({
  gameType,
  endedInPeriod,
}: FinalGameStatusProps) => {
  console.log('FinalGameStatus', { gameType, endedInPeriod });
  const endedInShootout = gameType === "RegularSeason" && endedInPeriod === 5;
  const endedInOvertime = endedInPeriod > 3 && !endedInShootout;

  if (endedInShootout) {
    return <FinalShootout />;
  }

  if (endedInOvertime) {
    const otPeriods = endedInPeriod - 3;
    return <FinalOvertime otPeriods={otPeriods} />;
  }

  return <span className="mx-auto block">Final</span>;
};
