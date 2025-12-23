"use client";
import React, { useEffect } from "react";
import { useToastStore } from "@/store/toastStore";

export const Toast = () => {
  const { message, visible, type, hideToast } = useToastStore();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => hideToast(), 5000); // auto-hide 5s
      return () => clearTimeout(timer);
    }
  }, [visible, hideToast]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-md text-white ${
        type === "warning" ? "bg-yellow-600" : "bg-blue-600"
      }`}
    >
      {message}
    </div>
  );
};
