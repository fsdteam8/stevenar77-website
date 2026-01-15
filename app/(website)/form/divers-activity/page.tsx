"use client";
import DiversActivityForm from "@/components/website/form/DiversActivityForm";
import React, { Suspense } from "react";

const page = () => {
  return (
    <div>
      {/* <BookingProvider> */}
      <Suspense>
        <DiversActivityForm />
      </Suspense>
      {/* </BookingProvider> */}
    </div>
  );
};

export default page;
