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
  (error) => Promise.reject(error),
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

// forgot password with email
export const postForgotPassword = async (email: { email: string }) => {
  const res = await api.post(`/auth/forgot-password`, email);
  return res.data;
};

// reset password in forgatepassword
export const postResetPassword = async (
  newPassword: { newPassword: string },
  token: string,
) => {
  try {
    const res = await api.post("/auth/reset-password", newPassword, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch {
    throw new Error("Failed to reset password");
  }
};

// Get All User
export const getAllUser = async () => {
  try {
    const res = await api.get(`/user/all-users`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch all users:", error);
    throw error;
  }
};

// Get All User Conversation
export const getUserConversation = async (userId: string) => {
  try {
    const res = await api.get(`/conversation/${userId}`);
    return res.data;
  } catch {
    console.error("Error fetching conversations");
  }
};
