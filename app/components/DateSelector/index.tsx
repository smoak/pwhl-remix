import { Link, useNavigate } from "@remix-run/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { CalendarDate } from "@internationalized/date";
import { useCallback } from "react";
import { Picker } from "./Picker";

type DateSelectorProps = {
  readonly day: CalendarDate;
  readonly prevDay: string;
  readonly nextDay: string;
};

export const DateSelector = ({ day, nextDay, prevDay }: DateSelectorProps) => {
  const prevDayLink = `/${prevDay}`;
  const nextDayLink = `/${nextDay}`;
  const navigate = useNavigate();
  const onDateChanged = useCallback((date: CalendarDate) => {
    navigate(`/${date.toString()}`);
  }, []);

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-between gap-5 pt-4 md:justify-end">
        <Link
          prefetch="intent"
          className="p-2"
          to={prevDayLink}
          aria-label="previous day"
        >
          <ArrowLeftIcon className="h-5 w-5 text-black" />
        </Link>
        <Picker date={day} onDateChanged={onDateChanged} />
        <Link
          prefetch="intent"
          className="p-2"
          to={nextDayLink}
          aria-label="next day"
        >
          <ArrowRightIcon className="h-5 w-5 text-black" />
        </Link>
      </div>
    </div>
  );
};
