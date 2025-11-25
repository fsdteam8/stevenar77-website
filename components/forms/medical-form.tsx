"use client";

import { Suspense } from "react";
// import DiverMedicalForm from "./diver-medical-form";

// import { DiverMedicalForm } from "./diver-medical-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <Suspense>
          {/* <DiverMedicalForm /> */}
          this is medical form
        </Suspense>
      </div>
    </div>
  );
}
