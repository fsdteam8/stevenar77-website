import React from "react";
import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import FeaturedClasses from "@/components/website/landing/FeaturedClasses";
import HomeHero from "@/components/website/landing/Hero";
import WhyLearnUs from "@/components/website/landing/WhyLearnUs";
import ScubaStevenar from "@/components/website/landing/ScubaStevenar";

export default function page() {
  return (
    <div className="">
      <HomeHero />
      <FeaturedClasses />
      <WhyLearnUs />
      <ScubaStevenar />
      <StillHaveQuestion />
    </div>
  );
}
