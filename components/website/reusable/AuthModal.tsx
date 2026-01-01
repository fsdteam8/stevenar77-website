"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold mb-4">Login Required</h2>
        <p className="mb-6 text-gray-600">
          {/* You need to be logged in to book this trip. */}
          Please login to access your account, book a course and/or trip, leave
          a review, send a chat, and/or shop for products!
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => (window.location.href = "/login")}>
            Login
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
