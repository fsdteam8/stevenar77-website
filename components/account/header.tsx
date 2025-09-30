'use client';

import { useState } from "react";
import { useSocial } from "@/services/hooks/social/social";
import {
  PhoneForwarded,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  X,
} from "lucide-react";
import Link from "next/link";

export function Header() {
  const { data, isLoading, error } = useSocial();
  const [isVisible, setIsVisible] = useState(true);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading social data</p>;
  if (!isVisible) return null;

  return (
    <header className="header-bg text-white relative py-3 px-4 sm:px-6">
      {/* Close Button */}
      {/* <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-3 text-gray-300 hover:text-red-500 transition"
      >
        <X className="w-5 h-5" />
      </button> */}

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm">
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <PhoneForwarded className="w-4 h-4" />
            <span className="hidden sm:inline">
              {data?.data[0]?.PhoneNumber || "714-728-2300"}
            </span>
            <span className="sm:hidden">Call Us</span>
          </div>

          {/* Email */}
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4" />
            <a
              href={`mailto:${data?.data[0]?.email || "scubastevenar@gmail.com"}`}
              className="hover:underline"
            >
              <span className="hidden md:inline">
                {data?.data[0]?.email || "scubastevenar@gmail.com"}
              </span>
              <span className="md:hidden">Email</span>
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">
              {data?.data[0]?.location || "Los Angeles & Ventura Counties"}
            </span>
            <span className="sm:hidden">Location</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
          <span className="text-xs sm:text-sm hidden sm:inline">Follow Us:</span>
          <div className="flex space-x-2">
            {data?.data[0]?.facebook && (
              <Link href={data?.data[0]?.facebook} target="_blank">
                <Facebook className="w-4 h-4 cursor-pointer hover:opacity-80" />
              </Link>
            )}
            {data?.data[0]?.instagram && (
              <Link href={data?.data[0]?.instagram} target="_blank">
                <Instagram className="w-4 h-4 cursor-pointer hover:opacity-80" />
              </Link>
            )}
            {data?.data[0]?.twitter && (
              <Link href={data?.data[0]?.twitter} target="_blank">
                <Twitter className="w-4 h-4 cursor-pointer hover:opacity-80" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
