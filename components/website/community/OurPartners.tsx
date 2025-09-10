import React from "react";

const OurPartners = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#27303F]">
          Our Partners
        </h2>
        <p className="mt-3 text-2xl md:text-[32px] text-center text-[#27303F]">
          Without our partners we wouldn&apos;t be able to do the things we do:
        </p>

        {/* Content */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2   gap-12 text-[#27303F]">
          {/* Left Column */}
          <div className=" mx-auto">
            <h3 className="font-semibold text-lg text-[#27303F] mb-4">
              Dive Gear Vendors:
            </h3>
            <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
              <li>• Bare</li>
              <li>• Atomic Aquatics</li>
              <li>• Stahlsac</li>
              <li>• Zeagle</li>
              <li>• Oceanic</li>
              <li>• Sherwood</li>
              <li>• Light And Motion</li>
              <li>• Sea and Sea</li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-8  mx-auto">
            <div>
              <h3 className="font-semibold text-lg text-[#27303F] mb-4">Dive Gear Vendors:</h3>
              <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
                <li>• Malibu Scuba Repair</li>
                <li>• Atomic Aquatics</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Training Partners:</h3>
              <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
                <li>• Divers Alert Network</li>
                <li>• LA Scuba Diving</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Catalina Island</h3>
              <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
                <li>• Catalina Divers</li>
                <li>• Antonio&apos;s Pizzaria</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
