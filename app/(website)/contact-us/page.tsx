import ContactUs from "@/components/website/contactUs/ContactUs";
import Hero from "@/components/website/shared/Hero";
import React from "react";

export default function page() {
  return (
    <div>
      <Hero
        title="Contact & Support"
        subtitle="Have questions about our courses or need support? We're here to help 24/7."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <ContactUs />
    </div>
  );
}
