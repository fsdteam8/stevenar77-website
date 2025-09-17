import VerifyOTP from "@/components/auth/VerifyOTP";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense>
        <VerifyOTP />
      </Suspense>
    </div>
  );
}
