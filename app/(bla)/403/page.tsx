"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary/10 text-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-lg w-full">
        {/* <h1 className="text-6xl font-bold text-primary mb-4">403</h1> */}
        <h2 className="text-2xl font-semibold mb-2 text-red-500">Login Required!</h2>
        <p className="text-gray-600 mb-8">
          Sorry, You are not a user, Please login to Book this course! 
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            variant="default"
            className="rounded-xl"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Go Home
          </Button>

          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
