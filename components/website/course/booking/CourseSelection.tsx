"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useBooking } from "../booking-context";
import { CourseDetail } from "@/lib/course";
interface coursData {
  courseData: CourseDetail;
}
interface courseprops {
  courseData: coursData;
}
export function CourseSelection(courseData: courseprops) {
  const { state } = useBooking();

  // console.log("age is here", courseData.courseData.courseData.duration);
  const data = courseData?.courseData?.courseData;
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Your Selected Course
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border-2 border-[#0694a2] rounded-lg bg-blue-50">
        {/* Course Image */}
        <Image
          src={state.course.image || "/scuba-diving-underwater-scene.jpg"}
          alt={state.course.name}
          width={320}
          height={256}
          className="w-20 h-16 rounded object-cover"
        />

        {/* Course Details */}
        <div className="flex-1">
          <h3 className="font-semibold text-[#343a40]">{state.course.name}</h3>
          <div className="flex items-center gap-4 text-sm text-[#6c757d]">
            <span className="flex items-center gap-1">
              👥 Age: {data?.minAge ?? "N/A"}
              {data?.maxAge && data.maxAge > 0 ? ` - ${data.maxAge}` : ""}
            </span>
          </div>
        </div>

        {/* Price Section */}
        <div className="text-right mt-3 sm:mt-0">
          <div className="text-2xl font-bold text-[#343a40]">
            $ {state.course.price.toLocaleString("en-US",{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </div>
          <div className="text-sm text-[#6c757d]">Per Person</div>
        </div>
      </div>
    </Card>
  );
}
