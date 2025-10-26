"use client";
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductPaymentSuccess = () => {
  const router = useRouter();
  
    return (
      <div className="flex items-center justify-center  px-4">
        <Card className="w-full  text-center shadow-lg rounded-2xl">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Payment Successful 🎉
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase.
            </p>
            
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => router.push("/")}>
                back to home
              </Button>
              {/* <Button onClick={() => router.push("/account")}>View My Orders</Button> */}
            </div>
          </CardContent>
        </Card>
      </div>
    );
}

export default ProductPaymentSuccess