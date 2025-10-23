// Add this as a new component for step 6
"use client";

import { CheckCircle } from "lucide-react";

export function AllInformationDoneStep() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        All Information Completed!
      </h2>
      <p className="text-gray-600 mb-6">
        <span>
          Thank&apos;s for providing all the necessary details.To confirm Your
          booking now .
        </span>
        <span>
          You&apos;re all set to confirm your booking and make your Scuba Life
          adventure official!
        </span>
      </p>
      {/* <div className="bg-primary rounded-full text-white p-4">
        <p className="text-xl flex gap-4">Go For <span> Proceed to Payment </span></p> 
      </div> */}

      <div>
  <p className="text-lg text-gray-800 font-medium">
    <span className="block sm:hidden">
      Please Proceed to Payment <strong>below</strong> to secure your spot.
    </span>
    <span className="hidden sm:block">
      Please Proceed to Payment to secure your spot.
    </span>
  </p>
</div>


      <div className="flex gap-4"></div>
    </div>
  );
}
