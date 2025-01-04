import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPickerSingleProps } from "react-day-picker";
import { FocusEventHandler } from "react";

interface InputCalendarProps {
  placeholder?: string;
  value?: DayPickerSingleProps["selected"];
  onChange?: DayPickerSingleProps["onSelect"];
  onBlur?: FocusEventHandler<HTMLButtonElement>;
}

export function InputCalendar({
  placeholder = "",
  value,
  onChange,
  onBlur,
}: InputCalendarProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onBlur={onBlur}
          variant={"outline"}
          className={cn(
            "pl-3 text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
