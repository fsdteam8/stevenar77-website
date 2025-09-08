"use client";

import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, PhoneForwarded, Twitter, X } from "lucide-react";
 


export default function TopHeader() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <section className="bg-primary relative h-auto w-ful font-poppins">
      <div className="container mx-auto">
        <button
          onClick={() => setIsVisible(false)}
          className=" absolute md:right-2 md:top-4 right-4 top-5 sm:right-2 sm:top-5  text-gray-600 flex items-center hover:text-red-500 transition"
        >
          <X className="cursor-pointer" size={20} />
        </button>

        <div className="flex flex-col md:flex-row justify-between items-center py-2 md:py-4 text-sm md:text-base gap-1 md:gap-0">
          <div className="message text-center flex gap-6 md:text-left px-2">
            <div className="flex items-center text-white  gap-3">
              <PhoneForwarded className="text-white w-4 h-4 md:w-5 md:h-5" />
              <p className="text-xs md:text-sm">90860-6745678</p>
            </div>
            <div className="flex items-center text-white  gap-3">
              <Mail className="text-white w-4 h-4 md:w-5 md:h-5" />
              <p className="text-xs md:text-sm">info@aquaquestdiving.com</p>
            </div>
            <div className="flex items-center text-white  gap-3">
              <MapPin className="text-white w-4 h-4 md:w-5 md:h-5" />
              <p className="text-xs md:text-sm">Miami Beach, FL</p>
            </div>
          </div>
          <div className="phone-number flex flex-row items-center gap-2 md:gap-3 mt-1 md:mt-0">
            <div className="flex text-white gap-2">
              <p className="text-xs md:text-sm">Follow Us:</p>
              <div className=" flex gap-2">
                <Facebook className="" />
                <Instagram />
                <Twitter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
