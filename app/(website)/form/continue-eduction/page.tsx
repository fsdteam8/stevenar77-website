import { BookingProvider } from "@/components/website/course/booking-context";
import PadiLiabilityForm from "@/components/website/form/PadiLiabilityForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <BookingProvider>
        <Suspense>
          <PadiLiabilityForm />
        </Suspense>
      </BookingProvider>
      {/* <StandardsForm /> */}
    </div>
  );
};

export default page;
