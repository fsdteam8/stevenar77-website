import { Button } from "@/components/ui/button";
import ProductPaymentSuccess from "@/components/website/reusable/ProductPaymentSuccess";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto">
        <div className=" flex flex-col items-center justify-center px-4 py-8 space-y-6">
          {/* Go Back Button */}
          <div className="w-full   flex justify-start">
            <Link href="/shop">
              <Button variant="outline">Back to Shop</Button>
            </Link>
          </div>
          {/* Payment Success Card */}
          <div className="max-w-3xl w-full">
            <ProductPaymentSuccess />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
