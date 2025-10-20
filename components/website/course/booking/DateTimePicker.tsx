"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useBooking } from "../booking-context";
import { useSearchParams } from "next/navigation";

export function DateTimePicker() {
  const { state, dispatch } = useBooking();
  const searchParams = useSearchParams();

  console.log("this is state", state)

  const rawSchedule = searchParams.get("schedule");

  useEffect(() => {
    if (!rawSchedule) return;

    try {
      const decoded = decodeURIComponent(rawSchedule);
      const parsed = JSON.parse(decoded);


      // ✅ Dispatch scheduleId to state
      if (parsed._id) {
        dispatch({ type: "SET_SCHEDULE_ID", payload: parsed._id });
      }

      // ✅ Dispatch dates to selectedDate (same as before)
      const parsedDates = Array.isArray(parsed.dates) ? parsed.dates : [parsed.dates];
      dispatch({ type: "SET_DATE", payload: parsedDates });

      console.log("🗓️ Schedule ID:", parsed._id);
      console.log("🗓️ Parsed Dates from URL:", parsedDates);
    } catch (err) {
      console.error("❌ Error parsing URL schedule:", err);
    }
  }, [rawSchedule, dispatch]);

  const selectedDates = Array.isArray(state.selectedDate)
    ? state.selectedDate
    : state.selectedDate
      ? [state.selectedDate]
      : [];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Your Selected Training Dates
      </h2>

      {selectedDates.length > 0 ? (
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {selectedDates.map((date, index) => (
            <li key={index}>
              <span className="text-gray-600">Session {index + 1}:</span>{" "}
              <span className="font-medium text-xl text-[#212529]">
                {new Date(date).toISOString().split("T")[0]}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">
          No training dates were found in your booking link.
          <br />
          Please go back and select a schedule to continue.
        </p>
      )}
    </Card>
  );
}
