"use client";
import * as React from "react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar"; // ShadCN Calendar import

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate || undefined
  );

  const handleDateChange = (selected: Date | undefined) => {
    setDate(selected);
    if (selected) {
      onDateSelect(selected);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <ShadCalendar
        mode="single"
        selected={date}
        onSelect={handleDateChange}
        className="w-full"
      />
    </div>
  );
};

export default Calendar;
