// hooks/useAuth.ts
"use client";

import { createUserRegistration, postForgotPassword } from "@/lib/api";
import { useState } from "react";

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
}

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Sign up
  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
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

  // Forgot password
  const forgotPassword = async (data: ForgotPasswordData) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await postForgotPassword(data);
      setLoading(false);
      setSuccess("Password reset email sent successfully");
      return response;
    } catch (err) {
      setError("Failed to send reset email");
      setLoading(false);
      throw err;
    }
  };

  return { signUp, forgotPassword, loading, error, success };
};
