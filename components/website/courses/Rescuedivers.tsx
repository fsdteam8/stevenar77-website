"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { useCourse } from "@/services/hooks/courses/useCourse";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export interface ScheduleDate {
  date: string;
  location: string;
  isActive?: boolean;
}

export interface ScheduleSet {
  _id: string;
  title: string;
  description: string;
  participents: number;
  totalParticipents: number;
  sets: ScheduleDate[];
}

interface CoursePrice {
  amount?: number;
}

export interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  image?: { url: string };
  price: number[] | CoursePrice[];
  courseIncludes?: string[];
  schedule?: ScheduleSet[];
}

const CourseDetails = () => {
  const params = useParams();
  const courseId = params?.id as string;
  const { data: course, isLoading, isError, error } = useCourse(courseId);

  // console.log("this is courses data", course?.price);

  // const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [openSet, setOpenSet] = useState<number | null>(0);
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const handleBookNow = (courseId: string, scheduleSet?: ScheduleSet) => {
    if (!scheduleSet) return;
    // Prepare payload: only _id and dates
    const payload = {
      _id: scheduleSet._id,
      dates: scheduleSet.sets.map((item) => item.date),
    };

    // Encode for URL
    const scheduleParam = encodeURIComponent(JSON.stringify(payload));

    const redirectPath = `/courses/book/${courseId}?schedule=${scheduleParam}`;

    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", redirectPath);
      setShowLoginModal(true);
    } else {
      router.push(redirectPath);
    }
  };
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-lg">Loading course...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-red-500 text-lg">
          Error: {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  // Course not found
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <p className="text-center py-10 text-lg">Course not found.</p>
      </div>
    );
  }

  const hasSinglePrice =
    !course.price || !Array.isArray(course.price) || course.price.length <= 1;

  const displayPrice = Array.isArray(course.price)
    ? course.price[0]
    : course.price;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const toggleSet = (index: number) => {
    setOpenSet(openSet === index ? null : index);
  };

  const renderSchedule = () => {
    if (!course.schedule || course?.schedule.length === 0) return null;

    return (
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5 text-teal-600" />
          <h3 className="text-xl font-semibold text-[#27303F]">
            Available Schedules
          </h3>
        </div>

        <div className="space-y-4">
          {course?.schedule?.map(
            (scheduleSet: ScheduleSet, setIndex: number) => {
              if (!scheduleSet?.sets || scheduleSet?.sets?.length === 0)
                return null;
              const isOpen = openSet === setIndex;

              return (
                <div
                  key={setIndex}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => toggleSet(setIndex)}
                    className="w-full px-6 py-5 hover:bg-gray-50 transition-colors"
                  >
                    <div className=" items-start justify-between gap-1">
                      {/* Left: Title + Description */}

                      <div className="flex gap-4">
                        <div className="flex-1 text-left">
                          <h4 className="text-[18px] font-semibold text-gray-900 mb-2">
                            {scheduleSet.title}
                          </h4>
                          <p className="text-sm text-gray-600 leading-relaxed border rounded-md px-2 bg-blue-50 p-1">
                            {scheduleSet.description}
                          </p>
                        </div>

                        <div className="mt-10 border p-1 rounded-full cursor-pointer">
                          <ChevronDown
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 cursor-pointer  ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </div>

                      {/* Right: Slots + Action */}
                      <div className="flex items-center justify-center gap-4 flex-shrink-0 mt-4">
                        {/* Slot info */}
                        {/* <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg">
                          <div className="text-center">
                            <div className="text-[18px] font-semibold text-teal-700">
                              {scheduleSet.participents}
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            Spots
                          </div>
                        </div> */}

                        {scheduleSet.participents > 0 &&
                          scheduleSet.participents <= 2 && (
                            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg animate-pulse">
                              <div className="text-base font-semibold text-red-700">
                                Only {scheduleSet.participents} spot
                                {scheduleSet.participents > 1 ? "s" : ""} left
                              </div>
                            </div>
                          )}

                        {/* Conditional Button */}
                        {scheduleSet.participents > 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookNow(courseId, scheduleSet);
                            }}
                            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors cursor-pointer"
                          >
                            Book Now
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg cursor-not-allowed"
                          >
                            Sold Out
                          </button>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Collapsible Content */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 space-y-3 bg-gray-50">
                      {scheduleSet.sets.map(
                        (scheduleItem: ScheduleDate, itemIndex: number) => {
                          return (
                            <div
                              key={itemIndex}
                              className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-teal-300 transition-all duration-300"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date */}
                                <div className="flex items-start gap-3">
                                  <div className="w-11 h-11 bg-gradient-to-br from-teal-100 to-teal-50 rounded-xl flex items-center justify-center shadow-sm">
                                    <Calendar className="w-5 h-5 text-teal-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                      Date
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                      {formatDate(scheduleItem.date)}
                                    </p>
                                  </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-start gap-3">
                                  <div className="w-11 h-11 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center shadow-sm c">
                                    <MapPin className="w-5 h-5 text-orange-600" />
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                                      Location
                                    </p>
                                    <p className="text-sm font-bold text-gray-900">
                                      {scheduleItem.location}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    );
  };

  // Single Price Layout (Enhanced UI)
  const renderSinglePriceLayout = () => (
    <div className="border-t border-gray-200 mt-6 pt-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <span>Course Price</span>
        </h3>
        <div className="text-3xl font-bold text-primary bg-primary/10 px-5 py-2 rounded-2xl shadow-sm">
          $
          {displayPrice?.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>
      </div>

      {/* subtle divider */}
      <div className="h-px bg-gray-100 my-5" />

      {renderSchedule()}
    </div>
  );

  // Multiple Price Layout
  const renderMultiplePriceLayout = () => (
    <div className="border-t border-gray-200 pt-8">{renderSchedule()}</div>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="container mx-auto">
        <div className="px-4 sm:px-8 lg:px-16 py-4 md:py-14 lg:py-16 space-y-8">
          <div className="relative w-full h-[650px] mx-auto rounded-lg overflow-hidden shadow-md">
            <Image
              src={course.image?.url || "/images/course-placeholder.png"}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="mx-auto container">
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-5 justify-between items-start">
              <div className="w-full lg:col-span-2 space-y-12">
                <h1 className="text-4xl md:text-5xl text-[#27303F] font-bold mb-6">
                  {course.title}
                </h1>
                <p
                  className="text-gray-700 leading-relaxed text-lg mb-8"
                  dangerouslySetInnerHTML={{ __html: course.description }}
                />

                {course.courseIncludes && course.courseIncludes.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-xl font-semibold text-[#27303F] mb-4">
                      Course Includes:
                    </h3>
                    <ul className="space-y-4">
                      {course.courseIncludes.map(
                        (item: string, idx: number) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-2 h-2 bg-teal-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                            <span className="text-gray-700 text-lg">
                              {item}
                            </span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="w-full lg:col-span-1">
                {hasSinglePrice
                  ? renderSinglePriceLayout()
                  : renderMultiplePriceLayout()}
              </div>
            </div>
          </div>

          <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
            <DialogContent className="!max-w-xl">
              <DialogHeader>
                <DialogTitle>Login Required</DialogTitle>
                <DialogDescription>
                  You need to be logged in to book this course. Please login to
                  continue.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setShowLoginModal(false);
                    router.push("/login");
                  }}
                >
                  Login Now
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
};

export default CourseDetails;
