"use client";

import React from "react";
import Hero from "../shared/Hero";
import TripsCard from "./TripsCard";
import { useTrips } from "@/services/hooks/trip/useTrips";
import { useRouter } from "next/navigation";

export default function Trips() {
  const { data: trips, isLoading, isError, error } = useTrips();
  const router = useRouter();

  if (isLoading) return <p className="text-center py-10">Loading trips...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        {error instanceof Error ? error.message : "Error fetching trips"}
      </p>
    );

  return (
    <div>
      <Hero
        title="International Diving Trips"
        subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />

      {trips?.map((trip, index) => (
        <TripsCard
          key={trip._id}
          image={trip.images?.[0]?.url || "/images/default-trip.jpg"}
          title={trip.title}
          shortDescription={trip.description}
          seeMoreLink= {`/trips/${trip._id}`} // dynamic route
          bookNowLink={`/trips/book/${trip._id}`} // dynamic booking route
          reverse={index % 2 === 1} // alternate layout
        />
      ))}
    </div>
  );
}
