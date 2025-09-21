"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessOrder = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-6 py-16">
          {/* Success Message */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
            <h1 className="text-2xl font-semibold text-green-600 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-700 mb-6">
              Thank you for your order. You can view your order details or continue shopping.
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <Button
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => router.push("/account")}
              >
                View My Orders
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/shop")}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessOrder;
