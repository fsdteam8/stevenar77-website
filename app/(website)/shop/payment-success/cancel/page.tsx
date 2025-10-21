import PaymentCard from "@/components/website/reusable/PaymentCard";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen  bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-3xl w-full ">
        <PaymentCard
          title="Payment Cancelled"
          titleColor="text-red-600"
          message="Your payment was not completed. You can try again or return to Shop page."
          buttonText="Go Back to Shop"
          buttonRoute="/shop"
        />
      </div>
    </div>
  );
};

export default page;
