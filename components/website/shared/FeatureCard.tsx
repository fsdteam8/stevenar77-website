"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

type FeatureCardProps = {
  location?: string;
  image: string;
  title: string;
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  students: number;
  features: string[];
  price: string;
  ageRestriction?: string;
  onSeeMore?: () => void;
  onBookNow?: () => void;
  children: React.ReactNode;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  onSeeMore,
  onBookNow,
  children,
}) => {
  return (
    <section className="flex flex-col h-full my-5">
      <div  className="my-5 w-full h-full overflow-hidden rounded-2xl shadow-lg bg-white flex flex-col">
        {/* Course Image */}
        <div onClick={onSeeMore} className="cursor-pointer relative w-full">
          <Image
            src={image}
            alt={title}
            width={600}
            height={400}
            className="object-cover w-full aspect-[5/3]"
            priority
          />
        </div>

        {/* Card body (scroll-limited if too much content) */}
        <div onClick={onSeeMore} className=" px-4 py-3 cursor-pointer overflow-hidden">
          <div className="space-y-3 line-clamp-[8] max-h-96 overflow-hidden">
            {children}
          </div>
        </div>

        {/* Actions always pinned at bottom */}
        <div className="flex gap-3 px-4 pb-4 mt-auto">
          <Button
            variant="outline"
            className="flex-1 text-[16px] py-3 px-[16px] font-medium leading-[150%] text-[#0694A2]"
            onClick={onSeeMore}
          >
            See More
          </Button>
          <Button
            className="flex-1 bg-[#0694A2] py-3 px-[16px] text-white hover:bg-cyan-700"
            onClick={onBookNow}
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
