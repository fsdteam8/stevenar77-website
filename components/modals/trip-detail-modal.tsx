"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar, Clock, MapPin, Users, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface TripDetailModalProps {
  trip: {
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
    contactDate: string;
    contactPhone: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TripDetailModal({
  trip,
  isOpen,
  onClose,
}: TripDetailModalProps) {
  if (!trip) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>

          <div className="w-full h-64 overflow-hidden">
            <Image
              width={400}
              height={300}
              src="/bahamas-coral-reef-sunset-diving.jpg"
              alt={trip.title}
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
                    <span>{trip.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{trip.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{trip.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {trip.participants} participant
                      {trip.participants !== 1 ? "s" : ""}
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
                      trip.status === "complete"
                        ? "status-complete"
                        : "status-pending"
                    )}
                  >
                    {trip.status === "complete" ? "Complete" : "Pending"}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-[#364039]">
                  ${trip.price}
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#364039] mb-2">
                Description
              </h3>
              <p className="text-[#68706a]">{trip.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[#364039] mb-3">
                Contact Information&apos;s
              </h3>
              <div className="space-y-2 text-sm text-[#68706a]">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{trip.contactDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{trip.contactPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
