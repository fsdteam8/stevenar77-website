"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const ScubaStevenar = () => {
  return (
    <section className="mt-[60px] md:mt-[80px]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Text Section */}
          <div className="order-2 md:order-1">
            {/* Heading */}
            <h1 className="text-3xl md:text-5xl text-[#27303F] font-semibold font-montserrat mb-3">
              Steve &quot;Scuba Stevenar&quot;
            </h1>

            {/* Description */}
            <p className="text-[#6B7280] leading-[150%] font-normal text-[16px] mb-1">
              <span className="font-semibold  text-[#27303F]">
                Owner &amp; Lead Instructor
              </span>{" "}
              — Owner, Operator &amp; Instructor at Scuba Life. <br />
              Steve is all about adventure. A trained Firefighter/EMT, former
              rock band singer, occasional paid comedian, and author of{" "}
              <span className="italic">Mindshift Mastery</span> (available on
              Amazon &amp; Audible), he brings energy, humor, and heart to every
              dive.
            </p>

            <p className="text-[#6B7280] leading-[150%] font-normal text-[16px]  mb-3">
              He&apos;s explored oceans around the world — from the Galapagos to St.
              Croix, Socorro to the Maldives, La Paz to Cozumel, Thailand,
              Hawaii, the B.V.I., and Fiji. For Steve, the ocean is magic, and
              he&apos;s honored to share that wonder while teaching divers to safely
              explore it.
            </p>

            <p className="text-[#6B7280] leading-[150%] font-normal text-[16px]  mb-2">
              At Scuba Life, Steve doesn&apos;t just teach dives — he builds
              confidence, sparks curiosity, and welcomes you into a community of
              ocean explorers.
            </p>

            {/* Booking Section */}
            <div className="pt-4">
              <Link href="/about-us">
                <Button className="inline-block text-center cursor-pointer  text-[#0694A2] text-base  font-medium px-8 border-2 border-[#0694A2] py-2 rounded-lg bg-transparent hover:bg-[#0694A2] hover:text-white transition">
                  See More
                </Button>
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="rounded-lg overflow-hidden shadow-md order-1 md:order-2">
            <Image
              src="/asset/scubastevenar.png"
              alt="Rescue Diver training"
              width={800}
              height={700}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScubaStevenar;
