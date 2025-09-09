// hooks/useAuth.ts
"use client";

import { createUserRegistration, verifyOtpRequest } from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// interface  {
//   otp: string;
// }

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await createUserRegistration(data);
      setLoading(false);
      return response;
    } catch {
      setError("Registration failed");
      setLoading(false);
      throw new Error("Registration failed");
    }
  };

  const onVerifyOtp = async (values: { otp: string }, token: string) => {
    try {
      if (!token) {
        toast.error("No token found. Please sign up again.");
        return;
      }

      // OTP + Token backend এ পাঠানো
      const res = await verifyOtpRequest({ otp: values.otp }, token);

      toast.success("OTP verified successfully!");
      console.log("Verify OTP response:", res.data);

      // সব clear করে দাও
      localStorage.clear();
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return { signUp, onVerifyOtp, loading, error };
};
