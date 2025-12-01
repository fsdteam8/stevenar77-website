// import { BookingProvider } from "@/components/website/course/booking-context";
// import { TripBookingProvider } from "@/components/website/course/steps/TripBookingContext";
// import PadiLiabilityForm from "@/components/website/form/PadiLiabilityForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      {/* <TripBookingProvider> */}
      <Suspense>{/* <PadiLiabilityForm /> */}</Suspense>
      {/* </BookingProvider> */}
      {/* <StandardsForm /> */}
    </div>
  );
};

export default page;
