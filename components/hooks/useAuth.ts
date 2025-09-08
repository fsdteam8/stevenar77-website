// hooks/useAuth.ts
"use client";

import { createUserRegistration, verifyOtpRequest } from "@/lib/api";
import { useState } from "react";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface VerifyOtpData {
  otp: string;
}

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

const verifyOtp = async (data: VerifyOtpData) => {
  setLoading(true);
  setError(null);
  try {
    // Send the object with otp
    const response = await verifyOtpRequest(data);
    setLoading(false);
    return response;
  } catch {
    setError("OTP verification failed");
    setLoading(false);
    throw new Error("OTP verification failed");
  }
};

  return { signUp, verifyOtp, loading, error };
};
