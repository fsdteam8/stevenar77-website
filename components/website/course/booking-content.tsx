"use client";

import { CourseSelection } from "./booking/CourseSelection";
import { DateTimePicker } from "./booking/DateTimePicker";
// import { ParticipantsSelect } from "./booking/ParticipantsSelect";
import { PricingSelection } from "./booking/PricingSelection";

export function BookingContent() {
  return (
    <div className="space-y-6">
      <CourseSelection />
      <PricingSelection />
      {/* <ParticipantsSelect /> */}
      <DateTimePicker />
    </div>
  );
}
