import React, { useState } from "react";
import BookingCard from "../shared/BookingCard";
import Calendar from "./BookingCalender";
import BookingForm from "./BookingForm";
import { BookingData, Course } from "@/lib/type";


interface BookingCourseLeftProps {
  onCourseSelect: (course: Course, formData: BookingData) => void;
}

const courses: Course[] = [
  {
    image: "/asset/booking1.png",
    title: "Open Water Diver",
    description: "The most popular scuba course in the world! Get your first scuba diving certification.",
    level: "Beginner",
    duration: "3-4 days",
    age: "10+",
    price: 450,
    includes: ["Instructor", "Equipment rental", "Certification card"],
  },
  {
    image: "/asset/booking2.png",
    title: "Advanced Open Water Diver",
    description: "Continue your adventure with 5 adventure dives to enhance your skills.",
    level: "Intermediate",
    duration: "2 days",
    age: "12+",
    price: 450,
    includes: ["Instructor", "Equipment rental", "Certification card"],
  },
  {
    image: "/asset/booking3.png",
    title: "Rescue Diver",
    description: "Learn to prevent and manage problems in the water, and become a more confident diver.",
    level: "Advanced",
    duration: "3 days",
    age: "15+",
    price: 450,
    includes: ["Instructor", "Equipment rental", "Certification card"],
  },
];

const BookingCourseLeft: React.FC<BookingCourseLeftProps> = ({ onCourseSelect }) => {
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [formData, setFormData] = useState<BookingData>({});

  const handleCourseSelect = (index: number) => {
    setSelectedCourseIndex(index);
    setSelectedDate(null);
    setFormData({});
    onCourseSelect(courses[index], {});
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    if (selectedCourseIndex !== null) {
      const data: BookingData = { ...formData, selectedDate: date.toLocaleDateString() };
      setFormData(data);
      onCourseSelect(courses[selectedCourseIndex], data);
    }
  };

  const handleFormSubmit = (data: BookingData) => {
    setFormData(data);
    if (selectedCourseIndex !== null) {
      onCourseSelect(courses[selectedCourseIndex], { ...data, selectedDate: selectedDate?.toLocaleDateString() });
    }
  };

  return (
    <div className="w-full lg:w-2/3 space-y-6 border p-6 rounded-lg">
      <h2 className="text-[#27303F] text-[16px] font-medium mb-4">Select Your Course</h2>

      {courses.map((course, i) => (
        <BookingCard
          key={i}
          {...course}
          isSelected={selectedCourseIndex === i}
          onSelect={() => handleCourseSelect(i)}
        />
      ))}

      {selectedCourseIndex !== null && (
        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-[16px] text-[#27303F] mb-3">Select Date & Time</h3>
            <Calendar onDateSelect={handleDateSelect} selectedDate={selectedDate} />
          </div>

          <div className="border rounded-lg p-6">
            <BookingForm
              course={courses[selectedCourseIndex]}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingCourseLeft;
