import { getHours, startOfDay, subDays } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

const EST_IANA_ZONE_ID = "America/New_York";
export const DATE_LINK_FORMAT = "yyyy-MM-dd";
export const DATE_DISPLAY_FORMAT = "dd MMMM yyyy";

const getTimeZonedDay = (date: Date): Date => {
  const hours = getHours(date);

  if (hours < 6) {
    return startOfDay(subDays(date, 1));
  }

  return startOfDay(date);
};

export const getToday = () => {
  const now = new Date().toISOString();
  const etNow = utcToZonedTime(now, EST_IANA_ZONE_ID);

  return getTimeZonedDay(etNow);
};
