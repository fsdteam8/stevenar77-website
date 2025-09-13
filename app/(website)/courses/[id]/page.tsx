import Rescuedivers from "@/components/website/courses/Rescuedivers";
import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import Hero from "@/components/website/shared/Hero";
import React from "react";

export default function Page() {
  return (
    <div>
      <Hero
        title="Course Details"
        subtitle="Start your underwater adventure with our comprehensive courses."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <Rescuedivers /> 
      <StillHaveQuestion />
    </div>
  );
}
