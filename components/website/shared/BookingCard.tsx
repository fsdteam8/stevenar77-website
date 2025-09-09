import React from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Course } from "@/lib/type";


interface BookingCardProps extends Course {
  isSelected?: boolean;
  onSelect: () => void;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-blue-100 text-blue-700",
  Advanced: "bg-teal-100 text-teal-700",
};

const BookingCard: React.FC<BookingCardProps> = ({
  image,
  title,
  description = "",
  level,
  duration,
  age,
  price,
  isSelected = false,
  onSelect,
}) => {
  return (
    <div 
      className={`flex items-start md:items-center flex-col md:flex-row justify-between gap-4 border rounded-lg p-4 transition cursor-pointer ${
        isSelected ? "border-blue-500 bg-blue-50" : "hover:shadow-md"
      }`}
      onClick={onSelect}
    >
      {/* Left Section */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Image
          src={image}
          alt={title}
          width={147}
          height={125}
          className="rounded-md object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <p className="text-[12px] md:text-sm w-[90%] md:w-full text-gray-600">{description}</p>

          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
            <span
              className={`px-2 py-0.5 rounded-sm text-xs font-medium ${levelColors[level]}`}
            >
              {level}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {duration}
            </span>
            <span>Age {age}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="md:text-right">
        <p className="font-semibold text-lg text-gray-900">${price}</p>
        <p className="text-xs text-gray-500">Per Person</p>
      </div>
    </div>
  );
};

export default BookingCard;
