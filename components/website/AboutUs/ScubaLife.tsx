import Image from "next/image";
import React from "react";

export default function ScubaLife() {
  return (
    <div className="mx-auto container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-0 mt-10 md:mt-20">
        <div>
          <Image
            src={"/images/about4.png"}
            alt="Scuba Life Image"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-3">
            Scuba Life Mission
          </h1>
          <p className="text-[#6B7280] text-base leading-relaxed">
            A world where every diver feels confident, connected, and inspired
            to explore and protect the ocean we love.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-0 my-10 md:mt-24">
        <div>
          <h1 className="text-[#27303F] text-3xl font-bold mb-3">
            Scuba Life Vision
          </h1>
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
        <div>
          <Image
            src={"/images/about5.png"}
            alt="Scuba Life Image"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      <div className="mt-10 md:mt-20 p-4 md:p-0">
        <h1 className="text-[#27303F] text-3xl font-bold mb-3">Core Values</h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          Founded with a passion for ocean exploration and a commitment to
          excellence, Scuba Life exists to share the transformative power of
          diving with everyone. We believe the ocean has the power to change
          lives, build confidence, and create lasting connections. Our mission
          is simple: to guide you safely into the underwater world while
          fostering a deep respect for marine life and ocean conservation.
          <br />
          <br />
          1. Safety First - Every class, every dive, every trip is grounded in
          professional standards and trust. <br />
          2. Community - Diving is better together, we build connections that
          last far beyond the dive. <br />
          3. Adventure & Fun - Exploration with joy, curiosity, and excitement.{" "}
          <br />
          4. Growth & Learning - Each dive is a chance to expand skills,
          confidence, and mindset. <br />
          5. Ocean Respect Stewardship and sustainability guide how we dive and
          what we teach. <br />
          6. Professionalism with Heart Expertise delivered with warmth,
          patience, and passion. <br />
        </p>
      </div>

      <div className="mt-10 md:mt-16 p-4 md:p-0">
        <h1 className="text-[#27303F] text-3xl font-bold mb-3">
          Scuba Life&apos;s Promise
        </h1>
        <p className="text-[#6B7280] text-base leading-relaxed">
          With Scuba Life, you&apos;ll always feel safe, supported, and
          inspired-whether it&apos;s your first breath underwater or your hundredth
          dive trip. (We all know what happens on your 100th) <br /> Tag line: &quot;The
          Ocean. The Adventure. The Life. <br /> &quot; So assuming this last &quot;tag line&quot;
          wouldn&apos;t be listed as a tag line but it would be shown near the logo
          as a tag line would...
        </p>
      </div>
    </div>
  );
}
