// import Image from "next/image";
// import React from "react";

// const OurPartners = () => {
//   // Data for the content
//   const partners = [
//     {
//       title: "Dive Gear Vendors",
//       items: [
//         "Bare",
//         "Atomic Aquatics",
//         "Stahlsac",
//         "Zeagle",
//         "Oceanic",
//         "Sherwood",
//         "Light And Motion",
//         "Sea and Sea",
//       ],
//     },
//     {
//       title: " Dive Gear Vendors",
//       items: ["Malibu Scuba Repair", "Atomic Aquatics"],
//     },
//     {
//       title: "Training Partners",
//       items: ["Divers Alert Network", "LA Scuba Diving"],
//     },
//     {
//       title: "Catalina Island",
//       items: ["Catalina Divers", "Antonio's Pizzaria"],
//     },
//   ];

//   // Render list items dynamically
//   //eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const renderList = (items: any[]) => (
//     <ul className="space-y-2 font-normal text-[#68706A]">
//       {items.map((item, index) => (
//         <li key={index} className=" hover:text-primary  ">
//           • {item}
//         </li>
//       ))}
//     </ul>
//   );

//   return (
//     <section className="py-20 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between gap-2">
//           <div className="w-full">
//             <Image src={"/images/detailes2.png"} alt="" width={500} className="object-cover" height={500} />
//           </div>
//           <div className="">
//             {/* Heading */}
//             <h2 className="text-3xl md:text-4xl font-bold text-start text-[#27303F]">
//               Our Partners
//             </h2>
//             <p className="mt-3 text-2xl md:text-[32px] text-start text-[#27303F]">
//               Without our partners we wouldn&apos;t be able to do the things we
//               do:
//             </p>

//             {/* Content */}
//             <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-[#27303F]">
//               {/* Left Column */}
//               <div className="mx-auto">
//                 {partners.slice(0, 1).map((section, index) => (
//                   <div key={index}>
//                     <h3 className="font-semibold text-lg text-[#27303F] mb-4">
//                       {section.title}
//                     </h3>
//                     {renderList(section.items)}
//                   </div>
//                 ))}
//               </div>

//               {/* Right Column */}
//               <div className="space-y-8 mx-auto">
//                 {partners.slice(1).map((section, index) => (
//                   <div key={index}>
//                     <h3 className="font-semibold text-lg text-[#27303F] mb-4">
//                       {section.title}
//                     </h3>
//                     {renderList(section.items)}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default OurPartners;


import Image from "next/image";
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
        "Sea and Sea",
      ],
    },
    {
      title: "Dive Gear Vendors",
      items: ["Malibu Scuba Repair", "Atomic Aquatics"],
    },
    {
      title: "Training Partners",
      items: ["Divers Alert Network", "LA Scuba Diving"],
    },
    {
      title: "Catalina Island",
      items: ["Catalina Divers", "Antonio's Pizzaria"],
    },
  ];

  // Render list items dynamically
  const renderList = (items: string[]) => (
    <ul className="space-y-2 font-normal text-[#68706A]">
      {items.map((item, index) => (
        <li key={index} className="hover:text-primary">
          • {item}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-20 bg-white">
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Image */}
          <div className="w-full md:w-1/2">
            <Image
              src="/images/detailes2.png"
              alt="Our Partners"
              width={500}
              height={500}
              layout="responsive"
              className="object-cover rounded-lg"
            />
          </div>

          {/* Right Column: Content */}
          <div className="w-full md:w-1/2 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#27303F] text-center md:text-left">
              Our Partners
            </h2>
            <p className="mt-4 text-xl md:text-2xl text-[#27303F] text-center md:text-left">
              Without our partners we wouldn&apos;t be able to do the things we do:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column for first partner section */}
              <div>
                {partners.slice(0, 1).map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg text-[#27303F] mb-4">{section.title}</h3>
                    {renderList(section.items)}
                  </div>
                ))}
              </div>

              {/* Right Column for the remaining partner sections */}
              <div>
                {partners.slice(1).map((section, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-lg text-[#27303F] mb-4">{section.title}</h3>
                    {renderList(section.items)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
