export type ScoreProps = {
  readonly score: number;
};

export const Score = ({ score }: ScoreProps) => {
  return <span className="w-1/3 text-left text-2xl font-bold">{score}</span>;
};
