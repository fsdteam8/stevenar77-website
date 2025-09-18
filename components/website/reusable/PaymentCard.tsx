"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface PaymentCardProps {
  title: string;
  message: string;
  buttonText?: string;
  buttonRoute?: string;
  titleColor?: string; // optional for styling (e.g., green/red)
}

const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  message,
  buttonText = "Go Back",
  buttonRoute = "/",
  titleColor = "text-green-600",
}) => {
  const router = useRouter();

  return (
    <Card className="max-w-md mx-auto mt-20 p-8 text-center shadow-lg">
      <h2 className={`text-2xl font-bold mb-4 ${titleColor}`}>{title}</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <Button
        onClick={() => router.push(buttonRoute)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md"
      >
        {buttonText}
      </Button>
    </Card>
  );
};

export default PaymentCard;
