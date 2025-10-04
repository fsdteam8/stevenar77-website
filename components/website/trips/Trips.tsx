// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

"use client";

import React from "react";
// import Hero from "../shared/Hero";
import TripsCard from "./TripsCard";
import { useTrips } from "@/services/hooks/trip/useTrips";
import { Skeleton } from "@/components/ui/skeleton";
// import { useRouter } from "next/navigation";

export default function Trips() {
  const { data: trips, isLoading, isError, error } = useTrips();
  // const router = useRouter();

  if (isLoading)
    return (
      <div className="bg-white py-10">
        <h2 className="text-center text-2xl font-semibold mb-8">
          Upcoming Trips
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border rounded-2xl p-4 shadow-sm flex  gap-3"
            >
              {/* Trip image */}
              <Skeleton className="w-full h-40 rounded-xl" />

              {/* Trip title */}
              <Skeleton className="h-5 w-3/4" />

              {/* Trip location */}
              <Skeleton className="h-4 w-1/2" />

              {/* Description lines */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              {/* Date / Button section */}
              <div className="flex justify-between items-center mt-3">
                <Skeleton className="h-4 w-24" /> {/* Date or price */}
                <Skeleton className="h-8 w-20 rounded-md" /> {/* Button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        {error instanceof Error ? error.message : "Error fetching trips"}
      </p>
    );

  return (
    <div>
      {/* <Hero
        title="International Diving Trips"
        subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      /> */}

      {trips?.data?.map((trip, index) => (
        <TripsCard
          key={trip._id}
          image={trip.images?.[0]?.url || "/images/default-trip.jpg"}
          title={trip.title}
          shortDescription={trip.description}
          seeMoreLink={`/trips/${trip._id}`} // dynamic route
          bookNowLink={`/trips/book/${trip._id}`} // dynamic booking route
          reverse={index % 2 === 1} // alternate layout
        />
      ))}
    </div>
  );
}
