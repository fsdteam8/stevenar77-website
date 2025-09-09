import React from "react";
import Hero from "../shared/Hero";
import TripsCard from "./TripsCard";

export default function Trips() {
  return (
    <div>
      <Hero
        title="International Diving Trips"
        subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
        backgroundImage="/images/imagewater.jpg"
      />
      <TripsCard
        image="/images/TripsCard.png"
        title="St Croix, U.S. Virgin Island"
        shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
        seeMoreLink={`/trips/1`}
        bookNowLink="/booking/st-croix"
        reverse={false}  
      />
      <TripsCard
        image="/images/TripsCard2.png"
        title="St Croix, U.S. Virgin Island"
        shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
        seeMoreLink={`/trips/1`}
        bookNowLink="/booking/st-croix"
        reverse={true} 
      />
      <TripsCard
        image="/images/TripsCard3.png"
        title="St Croix, U.S. Virgin Island"
        shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
        seeMoreLink={`/trips/1`}
        bookNowLink="/booking/st-croix"
        reverse={false} 
      />
      <TripsCard
        image="/images/TripsCard4.png"
        title="St Croix, U.S. Virgin Island"
        shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is stunning! Colorful fish and coral reefs, forests of sea fans and sea whips, while other marine animals hide in caverns and under ledges. Observe turtles, bright parrotfish, blue tangs, queen triggerfish, moray eels and so much more."
        seeMoreLink={`/trips/1`}
        bookNowLink="/booking/st-croix"
        reverse={true} 
      />
    </div>
  );
}
