import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import FeaturedClasses from "@/components/website/landing/FeaturedClasses";
import HomeHero from "@/components/website/landing/Hero";
import WhyLearnUs from "@/components/website/landing/WhyLearnUs";

import React from "react";
import ScubaStevenar from "@/components/website/landing/ScubaStevenar";
import Familyreviews from '@/components/website/landing/Familyreviews';

export default function page() {
  return (
    <div className=" py-10">
      <HomeHero />
      <FeaturedClasses />
      <ScubaStevenar />
      <Familyreviews />
      <WhyLearnUs />
      <StillHaveQuestion />
    </div>
  );
}
