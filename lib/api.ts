import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  New user Registration
export const createUserRegistration = async (userData: {
  firstName: string; 
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/user/register", userData);
  return response.data;
};

// ---------------- Verify OTP ----------------
export const verifyOtpRequest = (data: { otp: string }, token: string) => {

  console.log("Sending OTP with token:", token); // Debugging line
  console.log("OTP Data:", data); // Debugging line
  return api.post("/user/verify-email", data, {
    headers: {
      Authorization: `Bearer ${token}`,  
    },
  });
};