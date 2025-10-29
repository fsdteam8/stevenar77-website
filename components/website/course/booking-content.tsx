"use client";

import { CourseDetail } from "@/lib/course";
import { CourseSelection } from "./booking/CourseSelection";
import { DateTimePicker } from "./booking/DateTimePicker";
// import { ParticipantsSelect } from "./booking/ParticipantsSelect";
import { PricingSelection } from "./booking/PricingSelection";
interface coursData {
  courseData: CourseDetail;
}

export function BookingContent(courseData: coursData) {
  // console.log("co");
  return (
    <div className="space-y-6">
      <CourseSelection courseData={courseData} />
      {courseData.courseData.addOnce.length > 0 && (
        <PricingSelection courseData={courseData} />
      )}
      {/* <ParticipantsSelect /> */}
      <div className="hidden">
        <DateTimePicker />
      </div>
    </div>
  );
}
