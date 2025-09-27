"use client";

import Image from "next/image";
import React from "react";

interface ImageItem {
  public_id: string;
  url: string;
  _id: string;
}

interface OurStoryProps {
  title: string;
  description: string;
  images: ImageItem[];
}

export default function OurStory({ title, description, images }: OurStoryProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-4">{title}</h1>
          <p className="text-[#6B7280] text-base leading-relaxed">
            {description}
            </p>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {images.map((img, index) => (
            <div
              key={img._id}
              className={index === 0 ? "row-span-2" : ""}
            >
              <Image
                src={img.url}
                alt={`Our Story Image ${index + 1}`}
                width={600}
                height={index === 0 ? 800 : 400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
