"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
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
            Thank you for your booking! A confirmation email has been sent to
            your inbox with all the details of your trip.
          </p>
          <div className="text-center mx-auto mb-6 border p-4 bg-gray-50 rounded-lg leading-8">
            <p className="mb-4 px-4 font-semibold text-gray-700">
            If you&apos;ve Booked Trip for Multiple People, Be Sure To Send Us
            <span className="text-primary">Each Participant&apos;s Name , Email, Phone Number And Any Special
            Requirements at least 7 Days Before </span>The Trip Start Date.
          </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => router.push("/")}>
              Back to Home
            </Button>
            <Button onClick={() => router.push("/trips")}>View My Trips</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
