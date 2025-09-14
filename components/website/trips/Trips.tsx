// import React from "react";
// import Hero from "../shared/Hero";
// import TripsCard from "./TripsCard";

// export default function Trips() {
//   return (
//     <div>
//       <Hero
//         title="International Diving Trips"
//         subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
//         backgroundImage="/images/imagewater.jpg"
//         size="small"
//       />
//       <TripsCard
//         image="/images/TripsCard.png"
//         title="St Croix, U.S. Virgin Island"
//         shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
// There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
//         seeMoreLink={`/trips/1`}
//         bookNowLink="/booking/st-croix"
//         reverse={false}
//       />
//       <TripsCard
//         image="/images/tripsCard2.png"
//         title="St Croix, U.S. Virgin Island"
//         shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
// There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
//         seeMoreLink={`/trips/1`}
//         bookNowLink="/booking/st-croix"
//         reverse={true}
//       />
//       <TripsCard
//         image="/images/tripsCard3.png"
//         title="St Croix, U.S. Virgin Island"
//         shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
// There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
//         seeMoreLink={`/trips/1`}
//         bookNowLink="/booking/st-croix"
//         reverse={false}
//       />
//       <TripsCard
//         image="/images/tripsCard4.png"
//         title="St Croix, U.S. Virgin Island"
//         shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
// There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
//         seeMoreLink={`/trips/1`}
//         bookNowLink="/booking/st-croix"
//         reverse={true}
//       />
//     </div>
//   );
// }

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
          seeMoreLink={`/trips/${trip._id}`} // dynamic route
          bookNowLink={`/booking/${trip._id}`} // dynamic booking route
          reverse={index % 2 === 1} // alternate layout
        />
      ))}
    </div>
  );
}
