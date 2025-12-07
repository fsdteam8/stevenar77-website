// component/website/Cancel.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Home } from "lucide-react";

export const Cancel = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setMounted(true);
  }, []);

  const handleRetry = () => {
    // Go back to the previous page or checkout
    router.back();
  };

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6  bg-gradient-to-br from-red-50 via-orange-50 to-pink-50">
      {/* Main Card - Scale In Animation */}
      <div
        className={`bg-white shadow-2xl rounded-3xl p-10 max-w-xl w-full text-center border border-red-100 transition-all duration-500 ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
      >
        {/* Icon with Pulse Glow */}
        <div
          className={`flex justify-center mb-6  transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative">
            {/* Pulsing Glow Background */}
            <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            {/* Icon Container */}
            <div className="relative bg-red-100 rounded-full p-6">
              <XCircle size={64} className="text-red-500" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Title - Fade In Up */}
        <h1
          className={`text-3xl font-bold text-gray-900 mb-3 transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Payment Cancelled
        </h1>

        {/* Description - Fade In Up */}
        {/* <p
          className={`text-gray-600 text-base leading-relaxed mb-6 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          Your payment was not completed. Don&apos;t worry, no charges were made
          to your account.
        </p> */}

        {/* Action Buttons - Fade In Up */}
        <div
          className={`flex flex-col sm:flex-row gap-3 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <button
            onClick={handleGoHome}
            className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            <Home size={18} />
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
