"use client";

import Image from "next/image";
import React from "react";

interface TeamMember {
  image: { url: string; public_id?: string };
  title: string;
  possition: string;
  description: string;
  quote: string;
  features: string[];
  _id: string;
}

interface MeetTheTeamProps {
  teamMembers: TeamMember[];
}

export default function MeetTheTeam({ teamMembers }: MeetTheTeamProps) {
  return (
    <div className="mx-auto container p-4 md:p-0 my-10 md:my-26">
      <div className="text-center mb-10">
        <h1 className="text-[#27303F] text-5xl font-bold mb-3 mt-10 md:mt-20">
          Meet the Team
        </h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          Our certified instructors bring passion, expertise, and years of ocean
          <br />
          experience to guide your underwater journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member._id}
            className="bg-[#F7F8F8] p-4 md:p-4 rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Image */}
            <div className="flex-shrink-0 w-full sm:w-[180px] md:w-[220px]">
              <Image
                src={member?.image?.url}
                alt={member?.title}
                width={400}
                height={300}
                className="w-full h-[270px] object-cover rounded-md"
              />
            </div>

            {/* Text */}
            <div className="flex-1 text-left">
              <h1 className="text-[#27303F] text-3xl font-semibold mb-1">
                {member.title}
              </h1>
              <h5 className="font-medium text-[#27303F] mb-2 text-xl">
                {member.possition}
              </h5>
              <p
                className="mb-4 text-[#374151] text-base"
                dangerouslySetInnerHTML={{ __html: member.description }}
              />
              <div className="text-[#6B7280] mb-3 bg-[#E6E7E6] p-3 rounded-md italic">
                {member.quote}
              </div>
              <p className="text-[16px] text-[#6B7280]">
                {member.features.join(" • ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
