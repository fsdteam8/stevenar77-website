"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  price: number;
  status: "complete" | "pending";
  imageUrl: string;
  isHighlighted?: boolean;
  onView?: (id: string) => void; // made optional
  onDelete?: (id: string) => void; // optional
}

export function CourseCard({
  title,
  description,

  price,

  imageUrl,
  isHighlighted = false,
}: CourseCardProps) {
  // console.log(imageUrl);
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm transition-all",
        isHighlighted && "ring-2 ring-[#0694a2] ring-opacity-50",
      )}
    >
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={imageUrl || "/images/imagedata.jpg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#364039] mb-2 sm:mb-0">
              {title}
            </h3>
          </div>

          <p className="text-[#68706a] text-sm mb-3 line-clamp-2">
            <span
              dangerouslySetInnerHTML={{
                __html: description || "N/A",
              }}
            ></span>
          </p>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#364039]">${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
