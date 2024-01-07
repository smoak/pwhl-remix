import { Link } from "@remix-run/react";
import { format } from "date-fns";
import { DATE_DISPLAY_FORMAT, DATE_LINK_FORMAT } from "~/date-fns";
import ArrowIconLeft from "@heroicons/react/20/solid/ArrowLongLeftIcon";
import ArrowIconRight from "@heroicons/react/20/solid/ArrowLongRightIcon";

type DateSelectorProps = {
  readonly day: Date;
  readonly prevDay: Date;
  readonly nextDay: Date;
};

export const DateSelector = ({ day, nextDay, prevDay }: DateSelectorProps) => {
  const prevDayLink = `/${format(prevDay, DATE_LINK_FORMAT)}`;
  const nextDayLink = `/${format(nextDay, DATE_LINK_FORMAT)}`;

  return (
    <div className="flex flex-col pb-4">
      <div className="flex items-center justify-between gap-5 pt-4 sm:justify-start">
        <Link
          prefetch="intent"
          className="p-2"
          to={prevDayLink}
          aria-label="previous day"
        >
          <ArrowIconLeft className="h-5 w-5" />
        </Link>
        {format(day, DATE_DISPLAY_FORMAT)}
        <Link
          prefetch="intent"
          className="p-2"
          to={nextDayLink}
          aria-label="next day"
        >
          <ArrowIconRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};
