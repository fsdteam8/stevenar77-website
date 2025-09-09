import Image from "next/image";
import React from "react";

export default function OurStory() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Section */}
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-4">Our Story</h1>
          <p className="text-[#6B7280] text-base leading-relaxed">
            Founded with a passion for ocean exploration and a commitment to
            excellence, Scuba Life exists to share the transformative power of
            diving with everyone. We believe the ocean has the power to change
            lives, build confidence, and create lasting connections. Our mission
            is simple: to guide you safely into the underwater world while
            fostering a deep respect for marine life and ocean conservation.
            <br />
            <br />
            Founded with a passion for ocean exploration and a commitment to
            excellence, Scuba Life exists to share the transformative power of
            diving with everyone. We believe the ocean has the power to change
            lives, build confidence, and create lasting connections. Our mission
            is simple: to guide you safely into the underwater world while
            fostering a deep respect for marine life and ocean conservation.
          </p>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <div className="row-span-2">
            <Image
              src="/images/about1.png"
              alt="Large Story Image"
              width={600}
              height={800}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div>
            <Image
              src="/images/about2.png"
              alt="Small Story Image 1"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
          <div>
            <Image
              src="/images/about3.png"
              alt="Small Story Image 2"
              width={600}
              height={400}
              className="rounded-lg object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
