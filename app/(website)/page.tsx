import FeaturedClasses from "@/components/website/landing/FeaturedClasses";
import HomeHero from "@/components/website/landing/Hero";
import WhyLearnUs from "@/components/website/landing/WhyLearnUs";

import React from "react";

export default function page() {
  return (
    <div className=" py-10">
      <HomeHero />
      <FeaturedClasses />
      <WhyLearnUs />
    </div>
  );
}
