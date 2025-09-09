import Rescuedivers from "@/components/website/courses/Rescuedivers";
import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import Hero from "@/components/website/shared/Hero";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero
        title="Courses Details"
        subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <Rescuedivers />
      <StillHaveQuestion />
    </div>
  );
}
