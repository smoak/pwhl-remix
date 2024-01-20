import type { GoalType } from "~/components/types";

type ScoringTypeProps = {
  readonly goalType: GoalType;
};

const goalTypeToText: Record<Exclude<GoalType, "Even">, string> = {
  PowerPlay: "PP",
  ShortHanded: "SHG",
  EmptyNet: "EN",
};

export const ScoringType = ({ goalType }: ScoringTypeProps) => {
  if (goalType === "Even") {
    return null;
  }

  return (
    <div className="flex flex-col">
      Type
      <div className="font-bold">{goalTypeToText[goalType]}</div>
    </div>
  );
};
