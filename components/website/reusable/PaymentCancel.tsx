import React from "react";
import PaymentCard from "@/components/website/reusable/PaymentCard";

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <PaymentCard
        title="Payment Cancelled"
        titleColor="text-red-600"
        message="Your payment was not completed. You can try again or return to browse Trips."
        buttonText="Go Back to Trips"
        buttonRoute="/trips"
      />
    </div>
  );
};

export default PaymentCancelPage;
