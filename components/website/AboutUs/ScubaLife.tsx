"use client";

import Image from "next/image";
import React from "react";

interface ImageItem {
  public_id: string;
  url: string;
  _id: string;
}

interface SectionData {
  title: string;
  description: string;
  images?: ImageItem[];
}

interface ScubaLifeProps {
  mission: SectionData;
  vision: SectionData;
  coreValues: SectionData;
  promise: SectionData;
}

export default function ScubaLife({
  mission,
  vision,
  coreValues,
  promise,
}: ScubaLifeProps) {
  return (
    <div className="mx-auto container">
      {/* Mission Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-0 mt-10 md:mt-20">
        <div>
          <Image
            src={mission.images?.[0]?.url || "/images/about4.png"}
            alt={mission.title}
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-3">{mission.title}</h1>
          <p className="text-[#6B7280] text-base leading-relaxed">{mission.description}</p>
        </div>
      </div>

      {/* Vision Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-0 my-10 md:mt-24">
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-3">{vision.title}</h1>
          <p className="text-[#6B7280] text-base leading-relaxed">{vision.description}</p>
        </div>
        <div>
          <Image
            src={vision.images?.[0]?.url || "/images/about5.png"}
            alt={vision.title}
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Core Values */}
      <div className="mt-10 md:mt-20 p-4 md:p-0">
        <h1 className="text-[#27303F] text-3xl font-bold mb-3">{coreValues.title}</h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          {coreValues.description.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>

      {/* Promise Section */}
      <div className="mt-10 md:mt-16 p-4 md:p-0">
        <h1 className="text-[#27303F] text-3xl font-bold mb-3">{promise.title}</h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          {promise.description.split("\n").map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
