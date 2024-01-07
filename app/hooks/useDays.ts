import { addDays, parseISO, subDays } from "date-fns";
import { getToday } from "~/date-fns";

type Days = {
  readonly prevDay: Date;
  readonly nextDay: Date;
  readonly day: Date;
};

export const useDays = (date?: string): Days => {
  const day = date ? parseISO(date) : getToday();

  return {
    day,
    prevDay: subDays(day, 1),
    nextDay: addDays(day, 1),
  };
};
