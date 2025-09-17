"use client";

import { Calendar, Clock, MapPin, Users, Eye, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Image from "next/image";

// interface CourseCardProps {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   location: string;
//   participants: number;
//   price: number;
//   status: "complete" | "pending";
//   imageUrl: string;
//   isHighlighted?: boolean;
//   onView: (id: string) => void;
//   onDelete?: (id: string) => void;
// }

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
  onView?: (id: string) => void;      // made optional
  onDelete?: (id: string) => void;    // optional
}


export function CourseCard({
  id,
  title,
  description,
  date,
  time,
  location,
  participants,
  price,
  status,
  imageUrl,
  isHighlighted = false,
  onView,
  onDelete,
}: CourseCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-lg p-4 shadow-sm transition-all",
        isHighlighted && "ring-2 ring-[#0694a2] ring-opacity-50"
      )}
    >
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            width={100}
            height={100}
            src={imageUrl || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-[#364039] mb-2 sm:mb-0">
              {title}
            </h3>
            <Badge
              className={cn(
                "self-start sm:ml-2 px-3 py-1 text-xs font-medium rounded-full",
                status === "complete" ? "status-complete" : "status-pending"
              )}
            >
              {status === "complete" ? "Complete" : "Pending"}
            </Badge>
          </div>

          <p className="text-[#68706a] text-sm mb-3 line-clamp-2">
            {description}
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-4 text-sm text-[#68706a] mb-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span className="truncate">{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center space-x-1 col-span-2 sm:col-span-1">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{location}</span>
            </div>
            <div className="flex items-center space-x-1 col-span-2 sm:col-span-1">
              <Users className="w-4 h-4" />
              <span>
                {participants} participant{participants !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-[#364039]">${price}</span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onView?.(id)}
                className="text-[#68706a] hover:text-[#0694a2]"
              >
                <Eye className="w-4 h-4" />
              </Button>
              {onDelete && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onDelete(id)}
                  className="text-[#68706a] hover:text-[#e5102e]"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
