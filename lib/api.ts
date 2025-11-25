import { ProceedToPaymentData, TripBookingData } from "@/types/cart";
import axiosInstance from "./axiosInstance";

const api = axiosInstance;

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

// Get About API
export const getAbout = async () => {
  try {
    const res = await api.get(`/about`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch about:", error);
    throw error;
  }
};

export const fetchSocial = async () => {
  try {
    const res = await api.get("/social");
    // console.log('res',res)
    return res.data;
    // console.log('1',res.data)
  } catch {
    // console.log(error)
    throw new Error("Failed to fetch social data");
  }
};

// OTP Resend
export const resendOTP = async (token: string) => {
  try {
    const res = await api.post(
      "/auth/resend-forgot-otp",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("Failed to resend OTP:", error);
    throw error;
  }
};

// get single course
export const getSingleCourse = async (courseId: string) => {
  try {
    const res = await api.get(`/class/${courseId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch single course:", error);
    throw error;
  }
};

// get cart
export const getCart = async (userId: string) => {
  try {
    const res = await api.get(`/cart/pending/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error;
  }
};

// delete cart
export const deleteCart = async (cartId: string) => {
  try {
    const res = await api.delete(`/cart/delete/${cartId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to delete cart:", error);
    throw error;
  }
};

// Proceed to Payment cart checkout
export const proceedToPayment = async (data: ProceedToPaymentData) => {
  try {
    const res = await api.post(`/cart/checkout`, data);
    return res.data;
  } catch (error) {
    console.error("Failed to proceed to payment:", error);
    throw error;
  }
};

// Trip Booking
export const tripBooking = async (data: TripBookingData) => {
  try {
    const res = await api.post(`/cart/create`, data);
    return res.data;
  } catch (error) {
    console.error("Failed to proceed to payment:", error);
    throw error;
  }
};
