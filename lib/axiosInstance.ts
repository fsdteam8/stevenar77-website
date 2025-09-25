import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle session errors or token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      // If session has RefreshAccessTokenError, sign out
      const session = await getSession();
      if (session?.error === "RefreshAccessTokenError") {
        await signOut({ redirect: true, callbackUrl: "/signin" });
        return Promise.reject(error);
      }

      if (isRefreshing) {
        try {
          const token = await new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Get a new session which will automatically refresh the token
        const newSession = await getSession();
        if (!newSession?.accessToken) {
          throw new Error("Failed to refresh token");
        }

        processQueue(null, newSession.accessToken);
        isRefreshing = false;

        originalRequest.headers.Authorization = `Bearer ${newSession.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(
          refreshError instanceof Error
            ? refreshError
            : new Error("Failed to refresh token"),
          null,
        );
        isRefreshing = false;
        // Sign out if token refresh fails
        await signOut({ redirect: true, callbackUrl: "/signin" });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
