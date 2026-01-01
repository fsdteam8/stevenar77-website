"use client";
import { CheckCircle } from "lucide-react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  useEffect(() => {
    let timeoutId;

    const stored = localStorage.getItem("courseFormTitles");

    if (stored) {
      try {
        const parsed = JSON.parse(stored);

        if (parsed.course && parsed.course.length > 0) {
          timeoutId = setTimeout(() => {
            router.replace("/medical-form");
          }, 2000);
        } else {
          timeoutId = setTimeout(() => {
            router.replace("/");
          }, 3000);
        }
      } catch {
        timeoutId = setTimeout(() => {
          router.replace("/");
        }, 3000);
      }
    } else {
      timeoutId = setTimeout(() => {
        router.replace("/");
      }, 3000);
    }

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div className="flex items-center justify-center p-6 my-22">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-[500px] text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={70} className="text-green-500" />
        </div>

        <h1 className="text-2xl font-semibold">Payment Successful!</h1>
        {/* <p className="text-slate-600 mt-2">
          You will be redirected to home page
        </p> */}
      </div>
    </div>
  );
}
