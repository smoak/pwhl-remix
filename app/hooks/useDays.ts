import {
  CalendarDate,
  DateDuration,
  parseDate,
  today,
} from "@internationalized/date";
import { addDays, parseISO, subDays } from "date-fns";
import { getToday } from "~/date-fns";

type Days = {
  readonly prevDay: string;
  readonly nextDay: string;
  readonly day: CalendarDate;
};

const oneDay: DateDuration = {
  days: 1,
};

export const useDays = (date?: string): Days => {
  const day = date
    ? parseDate(date)
    : today(Intl.DateTimeFormat().resolvedOptions().timeZone);

  return {
    day,
    prevDay: day.subtract(oneDay).toString(),
    nextDay: day.add(oneDay).toString(),
  };
};
