import {
  Button,
  ButtonProps,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
} from "react-aria-components";
import { CalendarDate } from "@internationalized/date";
import {
  ChevronUpDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

type PickerProps = {
  readonly date: CalendarDate;
  readonly onDateChanged: (date: CalendarDate) => void;
};

const RoundButton = (props: ButtonProps) => {
  return (
    <Button
      {...props}
      className="flex h-8 w-8 cursor-default items-center justify-center rounded-full border-0 bg-transparent text-gray-600 outline-none ring-violet-600/70 ring-offset-2 hover:bg-gray-100 focus-visible:ring pressed:bg-gray-200"
    />
  );
};

export const Picker = ({ date, onDateChanged }: PickerProps) => {
  return (
    <DatePicker
      className="xs:max-sm:w-full group flex w-52 flex-col gap-1"
      value={date}
      onChange={onDateChanged}
      aria-label="Date"
    >
      <Group className="flex rounded-lg border border-pwhl-purple-50 pl-3 text-gray-700 ring-black transition group-open:bg-white focus-within:bg-white focus-visible:ring-2">
        <DateInput className="flex flex-1 py-2">
          {(segment) => (
            <DateSegment
              segment={segment}
              className="rounded-sm px-0.5 tabular-nums caret-transparent outline-none placeholder-shown:italic focus:bg-pwhl-purple-50 focus:text-white"
            />
          )}
        </DateInput>
        <Button className="flex items-center rounded-r-lg border-0 border-l border-solid bg-transparent px-3 text-gray-700 outline-none ring-black transition focus-visible:ring-2 pressed:bg-pwhl-purple-50 pressed:text-white">
          <ChevronUpDownIcon className="w-4" />
        </Button>
      </Group>
      <Popover className="overflow-auto rounded-lg bg-white ring-1 ring-black/10 drop-shadow-lg">
        <Dialog className="p-6">
          <Calendar>
            <header className="flex w-full items-center gap-1 px-1 pb-4">
              <Heading className="ml-2 flex-1 text-2xl font-semibold" />
              <RoundButton slot="previous">
                <ChevronLeftIcon className="w-4" />
              </RoundButton>
              <RoundButton slot="next">
                <ChevronRightIcon className="w-4" />
              </RoundButton>
            </header>
            <CalendarGrid className="border-separate border-spacing-1">
              <CalendarGridHeader>
                {(day) => (
                  <CalendarHeaderCell className="text-xs font-semibold text-gray-500">
                    {day}
                  </CalendarHeaderCell>
                )}
              </CalendarGridHeader>
              <CalendarGridBody>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className="ring-black-600/70 selected:bg-pwhl-purple-50 flex h-9 w-9 cursor-default items-center justify-center rounded-full outline-none ring-offset-2 outside-month:text-gray-300 hover:bg-gray-200 focus-visible:ring pressed:bg-gray-200 selected:bg-black selected:text-white"
                  />
                )}
              </CalendarGridBody>
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
};
