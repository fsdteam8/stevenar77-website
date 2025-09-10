"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Calendar, Clock, MapPin, Users, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useIsMobile from "@/services/hooks/use-mobile";

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
  const isMobile = useIsMobile();

  if (!trip) return null;

  const modalContent = (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className={cn(
          "absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-white/80 hover:bg-white/90 rounded-full w-8 h-8 p-0",
          "md:w-8 md:h-8 w-10 h-10"
        )}
      >
        <X className="w-4 h-4" />
      </Button>

      <div className="w-full h-48 md:h-64 overflow-hidden">
        <Image
          width={640}
          height={256}
          src="/bahamas-coral-reef-sunset-diving.jpg"
          alt={trip.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-semibold text-[#364039] mb-2">
              Booking Details
            </h2>
            <div className="space-y-2 text-sm text-[#68706a]">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{trip.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{trip.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{trip.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>
                  {trip.participants} participant
                  {trip.participants !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          </div>

          <div className="md:text-right">
            <div className="flex flex-row md:flex-col md:items-end space-x-4 md:space-x-0 md:space-y-2 mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-[#364039]">
                  Status
                </span>
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
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-[#364039]">
                  Payment
                </span>
                <div className="text-xl md:text-2xl font-bold text-[#364039]">
                  ${trip.price}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-semibold text-[#364039] mb-2">
            Description
          </h3>
          <p className="text-[#68706a] text-sm md:text-base leading-relaxed">
            {trip.description}
          </p>
        </div>

        <div>
          <h3 className="text-base md:text-lg font-semibold text-[#364039] mb-3">
            Contact Information&apos;s
          </h3>
          <div className="space-y-2 text-sm text-[#68706a]">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all">{trip.contactDate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>{trip.contactPhone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="max-h-[90vh] overflow-y-auto">
          <DrawerHeader className="sr-only">
            <DrawerTitle>Trip Details</DrawerTitle>
          </DrawerHeader>
          {modalContent}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {modalContent}
      </DialogContent>
    </Dialog>
  );
}
