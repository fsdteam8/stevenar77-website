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
