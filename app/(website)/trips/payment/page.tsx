"use client";

import PaymentSuccess from "@/components/website/reusable/PaymentSuccess";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const PaymentPage = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <div className=" flex flex-col items-center justify-center px-4 py-8 space-y-6">
          {/* Go Back Button */}
          <div className="w-full   flex justify-start">
            <Button variant="outline" onClick={() => router.push("/trips")}>
              Back to Trips
            </Button>
          </div>

          {/* Payment Success Card */}
          <div className="w-full  ">
            <PaymentSuccess />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
