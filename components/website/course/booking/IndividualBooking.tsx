// src/components/website/course/booking/IndividualBooking.tsx
"use client";

import { useBookCourse, useSingleCourse } from "@/hooks/course";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import PersonalInformation from "./PersonalInformation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface AddOnItem {
  _id: string;
  title: string;
  price: number;
}

export interface ParsedSchedule {
  _id: string;
  dates: string[];
}

export interface CourseData {
  _id: string;
  title: string;
  price: number;
  image?: { url: string };
  minAge: number;
  maxAge: number;
  addOnce?: AddOnItem[];
}

export default function IndividualBooking() {
  const params = useParams();
  const courseId = params.id as string;

  const searchParams = useSearchParams();
  const scheduleParam = searchParams.get("schedule");
  const [bookingComplete, setBookingComplete] = useState(false);

  // FINAL FIX — decode once, parse once
  let scheduleId = "";
  let scheduleDates: string[] = [];

  try {
    if (scheduleParam) {
      const decoded = decodeURIComponent(scheduleParam);
      const parsed = JSON.parse(decoded);

      scheduleId = parsed._id;
      scheduleDates = Array.isArray(parsed.dates) ? parsed.dates : [];
    }
  } catch (err) {
    console.error("❌ Failed to parse schedule:", err);
  }

  const {
    data,
    isLoading,
  }: { data?: { data: CourseData }; isLoading: boolean } =
    useSingleCourse(courseId);

  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);
  const [addOns, setAddOns] = useState<
    { id: number; title: string; price: number }[]
  >([]);

  const { data: session } = useSession();
  const userId = session?.user?.id || "";

  // Populate AddOns
  useEffect(() => {
    if (data?.data?.addOnce) {
      const formattedAddOns = data.data.addOnce.map(
        (item: AddOnItem, index: number) => ({
          id: index + 1,
          title: item.title,
          price: item.price,
        }),
      );
      setAddOns(formattedAddOns);
    }
  }, [data]);

  const toggleAddOn = (id: number) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  // CORRECTED FORM DATA TYPE (matches your schema)
  interface PersonalFormData {
    firstName: string;
    lastName: string;

    email: string;
    phone: string;

    age: number;
    gender: string;

    address: string;
    city: string;
    state: string;
    postalCode: number;

    shoeSize: number;
    heightFeet: number;
    heightInches: number;
    weight: number;
  }

  const { mutateAsync: bookCourse } = useBookCourse();

  const handleNext = (formData: PersonalFormData) => {
    const course = data?.data;
    if (!course) return;

    //  Ensure scheduleDates is never empty
    if (!scheduleDates || scheduleDates.length === 0) {
      console.error("❌ classDate is empty — cannot book");
      alert("No schedule dates found! Please select a valid schedule.");
      return;
    }

    const selectedAddOnItems = addOns.filter((a) =>
      selectedAddOns.includes(a.id),
    );

    const addOnTotal = selectedAddOnItems.reduce(
      (sum, item) => sum + item.price,
      0,
    );

    const totalPrice = Number(course.price) + addOnTotal;

    const Username = `${formData.firstName}${formData.lastName}`
      .replace(/\s+/g, "")
      .toLowerCase();

    const payload = {
      Username,
      email: formData.email,
      phoneNumber: formData.phone,
      age: Number(formData.age),
      gender: formData.gender,

      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: Number(formData.postalCode),

      shoeSize: Number(formData.shoeSize),
      height: Number(formData.heightFeet),
      heightInches: Number(formData.heightInches),
      weight: Number(formData.weight),

      scheduleId,
      classId: courseId,
      userId,

      participant: 1,

      //  FIXED — guaranteed array
      classDate: scheduleDates,

      courseTitle: course.title,
      coursePrice: course.price,

      addOns: selectedAddOnItems,
      addOnTotal,
      totalPrice,

      medicalDocuments: [],
      form: [],
    };

    // console.log(" FINAL BOOKING PAYLOAD:", payload);

    // Convert payload into FormData
    const formDataToSend = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value) || typeof value === "object") {
        formDataToSend.append(key, JSON.stringify(value));
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    // 🔥 CALL API
    bookCourse(formDataToSend)
      .then(() => {
        toast.success(
          "You're almost there! Your selected course has been successfully added to your cart.",
          // "You’re almost there! Your selected course has been successfully added to your cart. If you’d like to book another course, reserve a trip, or pick up some gear, just choose the appropriate option below. Once you’re ready, complete your checkout to officially lock in your Scuba Life adventure!🌊🐠"
        );
        setBookingComplete(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to add to cart! Please try again.");
      });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!data?.data)
    return (
      <div className="flex justify-center py-10">
        <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
      </div>
    );

  const course = data.data;

  const addOnTotal = addOns
    .filter((a) => selectedAddOns.includes(a.id))
    .reduce((sum, item) => sum + item.price, 0);

  const totalPrice = Number(course.price) + addOnTotal;

  if (bookingComplete) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center bg-white border rounded-2xl shadow-lg my-10">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-primary">{course.title}</span> - Individual
          Booking
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          {/* If you&lsquo;d like to book another course, reserve a trip, or pick up
          some gear, just choose the appropriate option below. Once you&apos;re
          ready, complete your checkout to make your Scuba Life adventure
          officially locked in! */}
          If you&apos;d like to book another course, reserve a trip, or pick up
          some gear, just choose the appropriate option below. Once you&apos;re
          ready, complete your checkout to officially lock in your Scuba Life
          adventure! 🌊🐠
        </p>

        {/* Mini Cart Summary */}
        <div className="bg-[#f0f4f8] rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Your Booking Summary</h2>

          {/* Course */}
          <div className="flex items-center gap-4 mb-4">
            <Image
              height={60}
              width={80}
              src={course?.image?.url || "/placeholder.png"}
              alt={course?.title}
              className="w-20 h-16 rounded-lg object-cover"
            />
            <div className="text-left">
              <p className="font-semibold">{course?.title}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                Class Date :
                {scheduleDates.length > 0 ? (
                  scheduleDates.map((date: string, idx: number) => {
                    const formattedDate = new Intl.DateTimeFormat("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    }).format(new Date(date));

                    return (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium"
                      >
                        {formattedDate}
                      </span>
                    );
                  })
                ) : (
                  <span className="text-gray-500">No dates selected</span>
                )}
              </div>
            </div>

            <div className="ml-auto text-right">
              <p className="font-semibold">
                ${course?.price?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Add-Ons */}
          {selectedAddOns.length > 0 && (
            <div className="border-t pt-4 mt-2">
              <h3 className="font-semibold mb-2 text-left">Add-Ons:</h3>
              {selectedAddOns.map((id) => {
                const add = addOns.find((a) => a.id === id);
                return (
                  <div
                    key={id}
                    className="flex justify-between text-gray-700 text-sm mb-1"
                  >
                    <span>{add?.title}</span>
                    <span className="ml-5 font-semibold">
                      ${add?.price?.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <div className="border-t mt-4 pt-2 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>$ {totalPrice?.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => (window.location.href = "/cart")}
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition cursor-pointer"
          >
            Go to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto container p-6">
      <h1 className="text-4xl font-bold text-center mb-2">Book Your Course</h1>
      <p className="text-center text-gray-600 mb-10">
        Complete your booking in just a few steps
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT CONTENT */}
        <div className="md:col-span-2">
          {/* Selected Course */}
          <div className="border rounded-xl p-6 shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Selected Course</h2>
            <div className="flex items-center gap-4 p-4 bg-[#eef6ff] rounded-xl border">
              <Image
                src={course?.image?.url || "/placeholder.png"}
                width={120}
                height={80}
                className="rounded-lg object-cover"
                alt={course.title}
              />
              <div>
                <p className="text-lg font-semibold">{course.title}</p>
                <p className="text-sm text-gray-600">
                  Age: {course.minAge} - <span>{course?.maxAge || ""}</span>
                </p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold">${course.price}</p>
                <p className="text-gray-500 text-sm">Per Person</p>
              </div>
            </div>
          </div>

          {/* Add Ons */}
          <div className="border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Choose Your Add-On</h2>
            {addOns.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 mb-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedAddOns.includes(item.id)}
                  onChange={() => toggleAddOn(item.id)}
                  className="w-5 h-5 mt-1"
                />
                <span>
                  {item.title} - <strong>${item.price}</strong>
                </span>
              </label>
            ))}
          </div>

          {/* FORM */}
          <PersonalInformation onNext={handleNext} courseTitle={course.title} />
        </div>

        {/* RIGHT SUMMARY */}
        <div className="border rounded-xl p-6 shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>

          <div className="flex items-center gap-3 mb-4">
            <Image
              src={course?.image?.url || "/placeholder.png"}
              width={80}
              height={60}
              className="rounded-lg"
              alt={course.title}
            />
            <div>
              <p className="font-semibold">{course.title}</p>
            </div>
          </div>

          <p className="font-semibold mb-2">Selected Training Dates:</p>
          <ul className="list-disc ml-6 mb-4">
            {scheduleDates.length > 0 ? (
              scheduleDates.map((date, i) => (
                <li key={i}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
              ))
            ) : (
              <li>No dates selected</li>
            )}
          </ul>

          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span>Course fee (x1)</span>
              <span>${course.price}</span>
            </div>

            {selectedAddOns.map((id) => {
              const add = addOns.find((a) => a.id === id);
              return (
                <div key={id} className="flex justify-between text-sm mb-1">
                  <span>{add?.title}</span>
                  <span>${add?.price}</span>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between text-lg font-semibold ">
            <span>Total</span>
            <span>${totalPrice?.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
