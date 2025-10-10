"use client";

import { useState } from "react";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  PhoneForwarded,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSocial } from "@/services/hooks/social/social";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopHeader() {
  const { data, isLoading, error } = useSocial();
  const [isVisible, setIsVisible] = useState(true);

  if (isLoading)
    return (
      <div className="bg-white border-b">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          {/* Left section (logo or brand) */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Right section (nav or profile icons) */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    );
  if (error) return <p>Error loading social data</p>;

  if (!isVisible) return null;

  return (
    <section className="bg-primary relative w-full font-poppins">
      <div className="container mx-auto">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute md:right-2 md:top-4 right-4 top-5 sm:right-2 sm:top-5 text-gray-600 flex items-center hover:text-red-500 transition"
        >
          <X className="cursor-pointer hover:text-white" size={20} />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-4 gap-2 md:gap-0 text-sm md:text-base">
          {/* Left Section */}
          <div className="message flex flex-col sm:flex-row justify-between items-center sm:items-start text-center sm:text-left gap-2 sm:gap-6 px-2">
            <div className="flex items-center text-white gap-2 sm:gap-3">
              <PhoneForwarded className="text-white w-4 h-4 sm:w-4 sm:h-4" />
              <p className="text-[10px] sm:text-xs md:text-sm">
                {data?.data[0].PhoneNumber
                  ? data?.data[0].PhoneNumber
                  : "714-728-2300"}
              </p>
            </div>
            <div className="flex items-center text-white gap-2 sm:gap-3 sm:text-xs md:text-sm">
              <Mail className="text-white w-4 h-4 sm:w-4 sm:h-4" />
              <a
                href="mailto:scubastevenar@gmail.com"
                className="hover:underline sm:text-xs md:text-sm"
              >
                {data?.data[0]?.email}
              </a>
            </div>
            <div className="flex items-center text-white gap-2 sm:gap-3 sm:text-xs md:text-sm">
              <MapPin className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              <p className="text-[10px] sm:text-xs md:text-sm">
                {data?.data[0]?.location}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="phone-number flex flex-row items-center gap-2 sm:gap-3 mt-2 md:mt-0 text-[10px] sm:text-xs md:text-sm">
            <p className="text-white">Follow Us:</p>
            <div className="flex gap-2 text-white sm:gap-3 sm:text-xs md:text-sm">
              <Link href={`${data?.data[0]?.facebook}`} target="_blank">
                <Facebook className="w-4 h-4 sm:w-4 sm:h-4 cursor-pointer" />
              </Link>
              <Link href={`${data?.data[0]?.instagram}`} target="_blank">
                <Instagram className="w-4 h-4 sm:w-4 sm:h-4" />
              </Link>
              {/* <Link href="https://x.com/" target="_blank">
                <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
