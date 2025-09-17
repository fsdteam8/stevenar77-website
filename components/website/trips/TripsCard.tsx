import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TripsCardProps {
  image: string;
  title: string;
  shortDescription: string;
  seeMoreLink: string;
  bookNowLink: string;
  reverse?: boolean; // optional, default = false
}

export default function TripsCard({
  image,
  title,
  shortDescription,
  seeMoreLink,
  bookNowLink,
  reverse = false,
}: TripsCardProps) {
  return (
    <div className="container mx-auto my-16 md:my-32">
      <div
        className={`grid grid-cols-1 md:grid-cols-12 items-center gap-6 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Image */}
        <div className="md:col-span-5 flex justify-center">
          <Image
            src={image}
            alt={title}
            width={730}
            height={600}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>

        {/* Content */}
        <div
          className={`md:col-span-7 p-4 ${
            reverse ? "md:[direction:ltr]" : ""
          }`}
        >
          {/* Title */}
          <h1 className="text-[#27303F] text-2xl font-semibold">{title}</h1>

          {/* Short Description */}
          <p className="text-[#68706A] text-base font-medium my-3 italic leading-relaxed">
            {shortDescription}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link href={seeMoreLink}>
              <Button className="border border-[#0694A2] text-gray-800 px-12 py-2 md:px-20 rounded-md hover:bg-gray-200 bg-transparent  transition cursor-pointer">
                See More
              </Button>
            </Link>
            <Link href={bookNowLink}>
              <Button className="bg-[#0694A2] text-white px-12 py-2 md:px-20 rounded-md hover:bg-[#057c88] transition cursor-pointer">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
