import Gallery from "@/components/website/AboutUs/Gallery";
import MeetTheTeam from "@/components/website/AboutUs/MeetTheTeam";
import OurStory from "@/components/website/AboutUs/OurStory";
import ScubaLife from "@/components/website/AboutUs/ScubaLife";
import WhyLearnUs from "@/components/website/landing/WhyLearnUs";
import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import Hero from "@/components/website/shared/Hero";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero
        title="We're Scuba Life — Where Adventure Meets the Ocean."
        subtitle="More than a dive shop, we're a community of explorers, teachers, and ocean lovers."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <OurStory />
      <ScubaLife />
      <MeetTheTeam />
      <WhyLearnUs />
      <Gallery />
      <StillHaveQuestion />
    </div>
  );
};

export default page;
