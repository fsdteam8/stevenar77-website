import Image from "next/image";
import React from "react";

export default function MeetTheTeam() {
  const team = [
    {
      name: 'Steve "Scuba SteveNar"',
      role: "Owner, Operator & Instructor",
      description:
        "Owner, Operator & Instructor at Scuba Life. Steve is all about adventure. A trained Firefighter/EMT, former rock band singer,",
      highlight:
        "✨ With SteveNar, you’re not just learning to dive — you’re joining an adventure.",
      details: "PADI Master Instructor • 15,000+ logged dives",
      image: "/images/about4.png",
    },
    {
      name: "Brandin Elmore",
      role: "OWSI (Open Water Scuba Instructor)",
      description:
        "Owner, Operator & Instructor at Scuba Life. Steve is all about adventure. A trained Firefighter/EMT, former rock band singer,",
      highlight:
        "✨ Safety first, adventure always — that’s Captain Brandin’s motto.",
      details: "PADI OWSI • Marine Biology Specialist • 8+ years experience",
      image: "/images/about6.png",
    },
    {
      name: "Krystle Elmore",
      role: "OWSI (Open Water Scuba Instructor)",
      description:
        "Owner, Operator & Instructor at Scuba Life. Steve is all about adventure. A trained Firefighter/EMT, former rock band singer,",
      highlight: "✨ Empowering divers to protect what they love underwater.",
      details:
        "PADI OWSI • Underwater Photography Specialist • Conservation Advocate",
      image: "/images/about7.png",
    },
    {
      name: 'Tony Fraser "Dancing"',
      role: "Owner, Operator & Instructor",
      description:
        "Owner, Operator & Instructor at Scuba Life. Steve is all about adventure. A trained Firefighter/EMT, former rock band singer,",
      highlight: "✨ Making every dive a celebration of ocean life.",
      details: "PADI Divemaster • Deep Diving Specialist • 6+ years experience",
      image: "/images/contact.png",
    },
  ];

  return (
    <div className="mx-auto container p-4 md:p-0 my-10 md:my-26">
      <div className="text-center mb-10">
        <h1 className="text-[#27303F] text-5xl font-bold mb-3 mt-10 md:mt-20">
          Meet the Team
        </h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          Our certified instructors bring passion, expertise, and years of ocean{" "}
          <br />
          experience to guide your underwater journey.
        </p>
      </div>

      {/* Grid for 2 cards per row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {team.map((member, index) => (
          <div
            key={index}
            className="bg-[#F7F8F8] p-4 md:p-4 rounded-lg flex flex-col sm:flex-row items-center sm:items-start gap-6"
          >
            {/* Image Left */}
            <div className="flex-shrink-0 w-full sm:w-[180px] md:w-[220px]">
              <Image
                src={member.image}
                alt={member.name}
                width={400}
                height={300}
                className="w-full h-[270px] object-cover rounded-md"
              />
            </div>

            {/* Text Right */}
            <div className="flex-1 text-left">
              <h1 className="text-[#27303F] text-3xl font-semibold mb-1">
                {member.name}
              </h1>
              <h5 className="font-medium text-[#27303F] mb-2 text-xl">{member.role}</h5>
              <p className="mb-4 text-[#374151] text-base">{member.description}</p>
              <div className="text-[#6B7280] mb-3 bg-[#E6E7E6] p-3 rounded-md italic">
                {member.highlight}
              </div>
              <p className="text-[16px] text-[#6B7280]">{member.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
