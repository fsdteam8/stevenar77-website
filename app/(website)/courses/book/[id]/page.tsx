import IndividualBooking from "@/components/website/course/booking/IndividualBooking";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        }
      >
        <IndividualBooking />
      </Suspense>
    </div>
  );
};

export default page;
