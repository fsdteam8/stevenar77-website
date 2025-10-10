"use client";

import React from "react";
import OurStory from "../website/AboutUs/OurStory";
import ScubaLife from "../website/AboutUs/ScubaLife";
import MeetTheTeam from "../website/AboutUs/MeetTheTeam";
import WhyLearnUs from "../website/landing/WhyLearnUs";
import Gallery from "../website/AboutUs/Gallery";
import StillHaveQuestion from "../website/reusable/stillHaveQuestion";
import { useAbout } from "@/lib/useAbout";
// import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function About() {
  const { data, isLoading, error } = useAbout();

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white space-y-6">
        {/* Circle for profile/avatar */}
        {/* <Skeleton className="w-20 h-20 rounded-full" /> */}

        {/* Title or heading */}
        <Skeleton className="h-6 w-48" />

        {/* Paragraph lines */}
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-4 w-72" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-56" />
        </div>

        {/* Buttons or tag section */}
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    );

  if (error || !data)
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 rounded-lg p-6 shadow-md">
        <svg
          className="w-12 h-12 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
          />
        </svg>
        <p className="text-red-700 font-semibold text-lg">
          Failed to load content
        </p>
        <p className="text-red-500 text-sm mt-2">
          Please check your connection or try again later.
        </p>
      </div>
    );

  const section1 = data?.data[0]?.section1;
  const section2 = data?.data[0]?.section2;
  const section3 = data?.data[0]?.section3;
  const section4 = data?.data[0]?.section4;
  const section5 = data?.data[0]?.section5;
  const team = data?.data[0]?.team?.card || [];
  const galleryImages = data?.data[0]?.galleryImages || [];

  return (
    <div className="!text-black">
      <OurStory
        title={section1.title}
        description={section1.description}
        images={section1.images}
      />
      <ScubaLife
        mission={section2}
        vision={section3}
        coreValues={section4}
        promise={section5}
      />
      <MeetTheTeam teamMembers={team} />
      <WhyLearnUs />
      <Gallery images={galleryImages} />
      <StillHaveQuestion />
    </div>
  );
}
