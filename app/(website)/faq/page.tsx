import FaqSection from "@/components/website/faq/faq";
import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import Hero from "@/components/website/shared/Hero";
import React from "react";

const page = () => {
  return (
    <div>
      <Hero
        title="Frequently Asked Questions"
        subtitle="Our team is ready to assist you with any questions, provide guidance, and help you confidently connect with the most suitable assisted living facilities for your loved ones."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
        <FaqSection />
      <StillHaveQuestion />
    </div>
  );
};

export default page;
