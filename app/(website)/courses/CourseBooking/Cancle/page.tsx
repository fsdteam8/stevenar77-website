import PaymentCard from "@/components/website/reusable/PaymentCard";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <PaymentCard
        title="Payment Cancelled"
        titleColor="text-red-600"
        message="Your payment was not completed. You can try again "
        buttonText="Go Back to Courses"
        buttonRoute="/courses"
      />
    </div>
  );
};

export default page;
