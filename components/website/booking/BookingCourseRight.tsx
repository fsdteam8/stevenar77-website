"use client";
import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Course {
  image: string;
  title: string;
  duration: string;
  age: string;
  price: number;
  includes?: string[]; // extra items like equipment, certificate, guide etc.
}

interface BookingData {
  name?: string;
  email?: string;
  phone?: string;
  participants?: number;
  selectedDate?: string;
  selectedTime?: string;
  totalPrice?: number;
  [key: string]: unknown; // for any extra dynamic fields
}

interface BookingCourseRightProps {
  selectedCourse: Course | null;
  bookingData: BookingData | null;
}

const BookingCourseRight: React.FC<BookingCourseRightProps> = ({
  selectedCourse,
  bookingData,
}) => {
  if (!selectedCourse) {
    return (
      <div className="w-full lg:w-1/3">
        <h2 className="font-semibold text-gray-800 mb-2">Booking Summary</h2>
        <div className="border rounded-lg p-6">
          <p className="text-gray-500 w-[90%] text-sm">
            Select a course to see booking details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full lg:w-1/3 rounded-2xl h-fit overflow-hidden bg-white">
      {/* Image */}
      <div className="flex items-center gap-6 p-6">
        <div className="relative w-[120px] h-[95px]">
          <Image
            src={selectedCourse.image}
            alt={selectedCourse.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="space-y-1">
          <h2 className="font-bold text-xl text-gray-900">
            {selectedCourse.title}
          </h2>
          <p className="text-sm font-normal text-gray-500">
            {selectedCourse.duration}
          </p>
          <p className="text-sm font-normal text-gray-500">
            Age {selectedCourse.age}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Booking details */}
        {bookingData?.selectedDate && (
          <div className="p-3 border-t pt-5 text-sm space-y-1">
            <p className="text-gray-700">
              📅 <span className="font-medium">{bookingData.selectedDate}</span>
            </p>
            {bookingData.selectedTime && (
              <p className="text-gray-700">
                ⏰ <span className="font-medium">{bookingData.selectedTime}</span>
              </p>
            )}
            {bookingData.participants && (
              <p className="text-gray-700">
                👥 <span className="font-medium">{bookingData.participants} Participants</span>
              </p>
            )}
          </div>
        )}

        {/* Price */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Course Fee</span>
            <span className="font-semibold">${selectedCourse.price}</span>
          </div>

          <p className="flex justify-between text-[#68706A] items-center text-sm">
            <span>Equipment rental</span>
            <span>Included</span>
          </p>
          <p className="flex justify-between text-[#68706A] items-center text-sm">
            <span>Digital Certification</span>
            <span>Included</span>
          </p>

          {bookingData?.totalPrice && (
            <div className="border-t pt-5">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#27303F] font-semibold">Total</span>
                <span className="font-semibold">${bookingData.totalPrice}</span>
              </div>

              <p className="flex flex-col text-[#68706A] pt-1 text-sm">
                <span>100% Safe & Secure</span>
                <span>Free Cancellation up to 24h</span>
              </p>
            </div>
          )}
        </div>

        {/* Button */}
        <Button className="w-full text-white py-3 rounded-xl font-medium transition">
          Proceed to Payment
        </Button>

        {/* Includes section */}
        {selectedCourse.includes && selectedCourse.includes.length > 0 && (
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">What Included</h3>
            <ul className="space-y-1">
              {selectedCourse.includes.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-gray-600">
                  <Check size={16} className="text-green-600 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCourseRight;
