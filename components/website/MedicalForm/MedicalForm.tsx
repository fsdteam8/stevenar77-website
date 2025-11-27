"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CourseFormItem {
  cartId: string;
  itemId: string;
  bookingId?: string;
  formTitle: string[];
  title: string;
  Username: string;
  email: string;
}

export default function MedicalForm() {
  const [courseData, setCourseData] = useState<CourseFormItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("courseFormTitles");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.course) {
          setCourseData(parsed.course);
        }
      } catch (error) {
        console.error("JSON parse error:", error);
      }
    }
  }, []);

  const handleSubmit = (bookingId: string | undefined) => {
    if (!bookingId) {
      console.error("Booking ID is missing");
      return;
    }
    alert(`Submit clicked for cart: ${bookingId}`);
    // Here you can add your API call or form submission logic
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-6 text-center">Medical PDF Form</h1>

      {courseData.length === 0 ? (
        <p className="text-gray-600 text-center">No course form data found.</p>
      ) : (
        <div className="space-y-6">
          {courseData.map((item, index) => (
            <div key={index} className="border rounded-lg shadow p-5 bg-white">
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p>
                  <strong>Name:</strong> {item.Username}
                </p>
                <p>
                  <strong>Email:</strong> {item.email}
                </p>
                <p>
                  <strong>Booking ID:</strong> {item.bookingId}
                </p>
                <p>
                  <strong>Course ID:</strong> {item.itemId}
                </p>
              </div>

              <div className="mt-3">
                <strong>Forms Title:</strong>
                <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                  {item.formTitle.map((title, i) => (
                    <li key={i}>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="text-blue-600 hover:underline cursor-pointer">
                            {title}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[400px]">
                          <DialogHeader>
                            <DialogTitle>Form Title</DialogTitle>
                          </DialogHeader>
                          <p className="mt-2 text-gray-700">{title}</p>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Close</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit button per cart */}
              <div className="mt-4">
                <Button onClick={() => handleSubmit(item.bookingId)}>
                  Submit
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
