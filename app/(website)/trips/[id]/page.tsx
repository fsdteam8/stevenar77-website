import Hero from "@/components/website/shared/Hero";
import TripsDetails from "@/components/website/trips/TripsDetails";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero
        title="Trips Details"
        subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <TripsDetails
        image="/images/TripsCard.png"
        title="St Croix, U.S. Virgin Island"
        date="June 6-13, 2026"
        shortDescription="Nowhere else in the Caribbean can you dive coral reefs, wrecks, walls and a pier – all in one day if you like!
There are more than 50 dive sites scattered around the north and west sides of the island. St. Croix offers variety and there is something for everyone; beginner, intermediate and advanced. The underwater world is "
        longDescription={`<p>
            St. Croix is a great Caribbean destination for scuba diving. Nowhere
            else in the Caribbean can you dive coral reefs, wrecks, walls and a
            pier – all in one day if you like!
            <br />
            <br />
            There are more than 50 dive sites scattered around the north and
            west sides of the island. St. Croix offers variety and there is
            something for everyone; beginner, intermediate and advanced. The
            underwater world is stunning! Colorful fish and coral reefs, forests
            of sea fans and sea whips, while other marine animals hide in
            caverns and under ledges. Observe turtles, bright parrotfish, blue
            tangs, queen triggerfish, moray eels and so much more.
            <br />
            <br />
            One of the best dive sites is located just off the shore where we
            will be staying…. The Wall! Beach dive or boat dive this location.
            One of the best on St Croix!
            <br />
            <br />
            We’ll be staying at The Landing @ Cane Bay. Steps from the beach and
            dive shop! Easy access to beach front restaurants. Rooms come with a
            kitchen so you can cook your own meals! Quite cottages with
            beautiful views and sounds of nature in one of the best locations in
            St Croix! Walk out from your room to one of the best dive sites on
            the island!
            <br />
            <br />
            <strong>Diving:</strong> 2 days of 2 tank boat dives and 6 beach
            dives! Add as much shore diving as you’d like!!
            <br />
            <strong>Is flight included?</strong> No. You are responsible for
            getting to St Croix.
            <br />
            <strong>What else is included?</strong> 7 nights accommodation with
            kitchen, Beach front access, 4 boat dives and 6 shore dives. A
            catered pool party/BBQ and more!
            <br />
            <strong>Hotel:</strong> The Landing at Cane Bay
            <br />
            <strong>Non-refundable deposit required:</strong> $500
            <br />
            <strong>Cost of the trip:</strong> $1,499 for double occupancy in
            cottage
            <br />
            $2,100 for single occupancy in one bedroom cottage
            <br />
            <strong>Payment schedule:</strong> $500 due at the time of booking
            <br />
            $500 due by Oct 1st, 2025
            <br />
            Balance due by Jan 1st, 2026
            <br />
            ****Deposits are non-refundable*** Payments made after deposit are
            refundable if we can sell you spot
          </p>`}
        price={450}
        gallery={[
          "/images/tripsCard4.png",
          "/images/detailes2.png",
          "/images/tripsCard3.png",
        ]}
      />
    </div>
  );
}
