// TODO: i18n
const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
const suffixes = new Map([
  ["one", "st"],
  ["two", "nd"],
  ["few", "rd"],
  ["other", "th"],
]);

type PeriodOrdinalProps = {
  readonly period: number;
};
export const PeriodOrdinal = ({ period }: PeriodOrdinalProps) => {
  const rule = pr.select(period);
  const suffix = suffixes.get(rule);

  return `${period}${suffix}`;
};
