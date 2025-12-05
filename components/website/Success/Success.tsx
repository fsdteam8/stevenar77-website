"use client";
import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("courseFormTitles");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed.course && parsed.course.length > 0) {
          //   const bookingId = parsed.course[0].bookingId;

          // Wait 3 seconds before redirect
          setTimeout(() => {
            router.replace(`/medical-form`);
          }, 2000);
        }
      } catch {
        console.error("Invalid localStorage courseFormTitles");
      }
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center p-6 my-22">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[500px] text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={70} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
        <p className="text-slate-600 mt-2">
          {/* Thank you! Your trip booking has been completed successfully. */}
          <br />
          {/* Redirecting in <span className="font-bold">3 seconds...</span> */}
        </p>

        <div className="mt-6">
          {/* <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-primary hover:bg-primary text-white rounded-lg shadow cursor-pointer"
          >
            Go to Home
          </button> */}
        </div>
      </div>
    </div>
  );
}
