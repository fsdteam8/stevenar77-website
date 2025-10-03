"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useBooking } from "../booking-context";
import { CourseDetail } from "@/lib/course";
interface coursData{
  courseData:CourseDetail;
}
interface courseprops{
  courseData:coursData;
}
export function CourseSelection(courseData:courseprops) {
  const { state } = useBooking();

  console.log("age is here", courseData.courseData.courseData.duration);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Select Your Course
      </h2>
      <div className="flex items-center gap-4 p-4 border-2 border-[#0694a2] rounded-lg bg-blue-50">
        <Image
          src={state.course.image || "/scuba-diving-underwater-scene.jpg"}
          alt={state.course.name}
          width={320} // intrinsic size for next/image
          height={256}
          className="w-20 h-16 rounded object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-[#343a40]">{state.course.name}</h3>
          {/* <p className="text-sm text-[#6c757d] mb-2">
            The most popular scuba course in the world! Get your first scuba
            diving certification.
          </p> */}
          <div className="flex items-center gap-4 text-sm text-[#6c757d]">
            <span className="bg-[#0694a2] text-white px-2 py-1 rounded text-xs">
              BEST DEAL
            </span>
            <span>⏱️ {courseData?.courseData?.courseData?.duration} Days</span>
            <span className="flex items-center gap-1">
              👥 Age:{courseData?.courseData?.courseData?.minAge}{" "}
              -{courseData?.courseData?.courseData?.maxAge}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#343a40]">
            $ {state.course.price}
          </div>
          <div className="text-sm text-[#6c757d]">Per Person</div>
        </div>
      </div>
    </Card>
  );
}
