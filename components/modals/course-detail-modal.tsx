"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface CourseDetailModalProps {
  course: {
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
    instructor: string;
    rating: number;
    reviews: number;
    courseIncludes: string[];
    contactDate: string;
    contactPhone: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CourseDetailModal({
  course,
  isOpen,
  onClose,
}: CourseDetailModalProps) {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative">
          <div className="w-full h-64 overflow-hidden">
            <Image
              width={400}
              height={300}
              src="/underwater-coral-reef-diving.jpg"
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-[#364039] mb-2">
                  Booking Details
                </h2>
                <div className="space-y-2 text-sm text-[#68706a]">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{course.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{course.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {course.participants} participant
                      {course.participants !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-[#364039]">
                    Status
                  </span>
                  <span className="text-sm font-medium text-[#364039]">
                    Payment
                  </span>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full",
                      course.status === "complete"
                        ? "status-complete"
                        : "status-pending"
                    )}
                  >
                    {course.status === "complete" ? "Complete" : "Pending"}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-[#364039]">
                  ${course.price}
                </div>
                <div className="flex items-center space-x-1 text-sm text-[#68706a]">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>
                    {course.rating} ({course.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#364039] mb-2">
                Instructor
              </h3>
              <p className="text-[#68706a]">{course.instructor}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#364039] mb-2">
                Description
              </h3>
              <p className="text-[#68706a]">{course.description}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#364039] mb-3">
                Course Includes:
              </h3>
              <ul className="space-y-2">
                {course.courseIncludes.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-[#68706a]"
                  >
                    <div className="w-2 h-2 bg-[#0694a2] rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#364039] mb-3">
                Contact Information&apos;s
              </h3>
              <div className="space-y-2 text-sm text-[#68706a]">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{course.contactDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{course.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
