// Add this as a new component for step 6
"use client";

import { ArrowRight, CheckCircle } from "lucide-react";

export function AllInformationDoneStep() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        All Information Completed!
      </h2>
      <p className="text-gray-600 mb-6">
        Thank you for providing all the necessary details.To confirm Your booking  now .
      </p>
      {/* <div className="bg-primary rounded-full text-white p-4">
        <p className="text-xl flex gap-4">Go For <span> Proceed to Payment </span></p> 
      </div> */}

      <div className="flex gap-4">
        
      </div>
    </div>
  );
}
