"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "../booking-context";

// ✅ Type definitions
interface ScheduleSet {
  date: string;
  location?: string;
  type?: string;
  isActive?: boolean;
}

interface ClassDate {
  sets: ScheduleSet[];
}

interface Course {
  classDates?: ClassDate[];
}

export function DateTimePicker() {
  const { state, dispatch } = useBooking();
// const course: Course | undefined = state.course;
const course: Course = {
  classDates: [
    {
      sets: [
        {
          date: new Date().toISOString(),
          location: "Online",
          type: "Lecture",
          isActive: true,
        },
      ],
    },
  ],
};


  // ✅ Collect all available first dates
  const firstSetDates: Date[] =
    course?.classDates
      ?.map((classDate) => {
        const firstSet = classDate.sets?.[0];
        if (!firstSet?.date) return null;
        const parsed = new Date(firstSet.date);
        return isNaN(parsed.getTime()) ? null : parsed;
      })
      .filter((d): d is Date => d !== null) ?? [];

  const allowedDates = firstSetDates.map((d) => d.toDateString());
  console.log("🎯 First Dates from each sets:", firstSetDates);

  // ✅ Handle user selecting a first date
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    // Find the classDate that matches this selected date
    const matchedClassDate = course?.classDates?.find((classDate) => {
      const firstSet = classDate.sets?.[0];
      return (
        firstSet?.date &&
        new Date(firstSet.date).toDateString() === date.toDateString()
      );
    });

    // ✅ Collect all related set dates for that class
    const allSetDates =
      matchedClassDate?.sets
        ?.map((s) => {
          const parsed = new Date(s.date);
          return !isNaN(parsed.getTime()) ? parsed.toISOString() : null;
        })
        .filter((d): d is string => d !== null) ?? [];

    console.log("📅 All Dates for this First Date:", allSetDates);

    // ✅ Dispatch the array to context
    // dispatch({ type: "SET_DATE", payload: allSetDates });
  };

  // ✅ Handle selected state (array-aware)
  const selectedDate =
    Array.isArray(state.selectedDate) && state.selectedDate.length > 0
      ? new Date(state.selectedDate[0])
      : typeof state.selectedDate === "string"
      ? new Date(state.selectedDate)
      : undefined;

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Select Available Date
      </h2>

      <div className="grid md:grid-cols-1 gap-6">
        <Calendar
          mode="single"
          selected={
            !isNaN(selectedDate?.getTime() ?? NaN) ? selectedDate : undefined
          }
          onSelect={handleDateSelect}
          className="rounded-md border w-full"
          disabled={(date) => !allowedDates.includes(date.toDateString())}
          classNames={{
            day_selected:
              "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
            day_today:
              "border border-[#0694a2] text-[#0694a2] font-semibold",
          }}
        />
      </div>
    </Card>
  );
}
