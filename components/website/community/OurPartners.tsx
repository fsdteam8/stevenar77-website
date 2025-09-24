// import React from "react";

// const OurPartners = () => {


//   const diveGearVendors = [
//     "Bare", 
//     "Atomic Aquatics", 
//     "Stahlsac", 
//     "Zeagle", 
//     "Oceanic", 
//     "Sherwood", 
//     "Light And Motion", 
//     "Sea and Sea"
//   ];

//   const additionalVendors = [
//     "Malibu Scuba Repair", 
//     "Atomic Aquatics"
//   ];

//   const trainingPartners = [
//     "Divers Alert Network", 
//     "LA Scuba Diving"
//   ];

//   const catalinaIsland = [
//     "Catalina Divers", 
//     "Antonio's Pizzaria"
//   ];


//   // Render list items dynamically
//   const renderList = (items) => (
//     <ul className="space-y-2 font-normal text-[#4A5568]">
//       {items.map((item, index) => (
//         <li key={index} className="hover:text-teal-400 hover:underline">
//           • {item}
//         </li>
//       ))}
//     </ul>
//   );


//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl font-bold text-center text-[#27303F]">
//           Our Partners
//         </h2>
//         <p className="mt-3 text-2xl md:text-[32px] text-center text-[#27303F]">
//           Without our partners we wouldn&apos;t be able to do the things we do:
//         </p>

//         {/* Content */}
//         <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2   gap-12 text-[#27303F]">
//           {/* Left Column */}
//           <div className=" mx-auto">
//             <h3 className="font-semibold text-lg text-[#27303F] mb-4">
//               Dive Gear Vendors:
//             </h3>
//             <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
//               <li>• Bare</li>
//               <li>• Atomic Aquatics</li>
//               <li>• Stahlsac</li>
//               <li>• Zeagle</li>
//               <li>• Oceanic</li>
//               <li>• Sherwood</li>
//               <li>• Light And Motion</li>
//               <li>• Sea and Sea</li>
//             </ul>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-8  mx-auto">
//             <div>
//               <h3 className="font-semibold text-lg text-[#27303F] mb-4">Dive Gear Vendors:</h3>
//               <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
//                 <li>• Malibu Scuba Repair</li>
//                 <li>• Atomic Aquatics</li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold text-lg mb-4">Training Partners:</h3>
//               <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
//                 <li>• Divers Alert Network</li>
//                 <li>• LA Scuba Diving</li>
//               </ul>
//             </div>

//             <div>
//               <h3 className="font-semibold text-lg mb-4">Catalina Island</h3>
//               <ul className="space-y-2 font-normal leading-[150%] text-[#68706A">
//                 <li>• Catalina Divers</li>
//                 <li>• Antonio&apos;s Pizzaria</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurPartners;



import React from "react";

const OurPartners = () => {
  // Data for the content
  const partners = [
    {
      title: "Dive Gear Vendors",
      items: [
        "Bare", 
        "Atomic Aquatics", 
        "Stahlsac", 
        "Zeagle", 
        "Oceanic", 
        "Sherwood", 
        "Light And Motion", 
        "Sea and Sea"
      ]
    },
    {
      title: "Additional Dive Gear Vendors",
      items: [
        "Malibu Scuba Repair", 
        "Atomic Aquatics"
      ]
    },
    {
      title: "Training Partners",
      items: [
        "Divers Alert Network", 
        "LA Scuba Diving"
      ]
    },
    {
      title: "Catalina Island",
      items: [
        "Catalina Divers", 
        "Antonio's Pizzaria"
      ]
    }
  ];

  // Render list items dynamically
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderList = (items: any[]) => (
    <ul className="space-y-2 font-normal text-[#68706A]">
      {items.map((item, index) => (
        <li key={index} className=" hover:text-primary hover:font-semibold">
          • {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#27303F]">
          Our Partners
        </h2>
        <p className="mt-3 text-2xl md:text-[32px] text-center text-[#27303F]">
          Without our partners we wouldn&apos;t be able to do the things we do:
        </p>

        {/* Content */}
        <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-[#27303F]">
          {/* Left Column */}
          <div className="mx-auto">
            {partners.slice(0, 1).map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg text-[#27303F] mb-4">
                  {section.title}
                </h3>
                {renderList(section.items)}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-8 mx-auto">
            {partners.slice(1).map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-lg text-[#27303F] mb-4">
                  {section.title}
                </h3>
                {renderList(section.items)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
