// "use client";

// import Image from "next/image";
// import React, { useState } from "react";

// // Props Interface
// interface TripsDetailsProps {
//   image: string;
//   title: string;
//   date: string;
//   shortDescription: string;
//   longDescription: string; // HTML string
//   price: number;
//   gallery?: string[];
// }

// export default function TripsDetails({
//   image,
//   title,
//   date,
//   shortDescription,
//   longDescription,
//   price,
//   gallery = [],
// }: TripsDetailsProps) {
//   const [quantity, setQuantity] = useState(1);

//   const increase = () => setQuantity((prev) => prev + 1);
//   const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   // 🔹 Handle Buy Now click
//   const handleBuyNow = () => {
//     console.log("Quantity:", quantity);
//     console.log("Total Price:", price * quantity);
//   };

//   return (
//     <div className="container mx-auto my-16 md:my-32">
//       {/* Main Details */}
//       <div className="grid grid-cols-12 gap-8 items-center">
//         {/* Left side - Image */}
//         <div className="col-span-12 md:col-span-5 p-4 md:p-0">
//           <Image
//             src={image}
//             alt={title}
//             width={1200}
//             height={600}
//             className="rounded-lg w-full"
//           />
//         </div>

//         {/* Right side - Content */}
//         <div className="col-span-12 md:col-span-7 space-y-3 p-4 md:p-0">
//           <h1 className="text-[#27303F] text-2xl font-semibold">{title}</h1>
//           <p className="text-[#27303F] text-base font-semibold">{date}</p>

//           {/* Short Description */}
//           <p className="text-[#68706A] text-[14px] font-medium italic">
//             {shortDescription}
//           </p>

//           {/* Quantity & Price Row */}
//           <div className="flex items-center gap-3 pb-4 mt-5">
//             <button
//               onClick={decrease}
//               className="border border-[#68706A] px-3 py-1 cursor-pointer"
//             >
//               -
//             </button>
//             <span className="text-lg">{quantity}</span>
//             <button
//               onClick={increase}
//               className="border border-[#68706A] px-3 py-1 cursor-pointer"
//             >
//               +
//             </button>
//             <span className="ml-4 text-lg font-semibold">
//               $ {price * quantity}
//             </span>
//           </div>

//           {/* Buy Button */}
//           <button
//             onClick={handleBuyNow}
//             className="bg-[#0694A2] border border-[#0694A2] text-white px-24 py-2 rounded-md cursor-pointer w-full md:w-auto"
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>

//       {/* Description */}
//       <div>
//         <h1 className="text-[#27303F] text-4xl font-semibold mt-12 mb-6 p-4 md:p-0">
//           Description
//         </h1>

//         {/* Long Description (HTML) */}
//         <div
//           className="text-[#6B7280] text-base p-4 md:p-0 space-y-3"
//           dangerouslySetInnerHTML={{ __html: longDescription }}
//         />

//         {/* Gallery Grid */}
//         {gallery.length === 3 && (
//           <div className="container mx-auto my-8 md:my-16 p-4 md:p-0">
//             <div className="grid grid-cols-12 gap-6">
//               {/* First Image - 3 cols */}
//               <div className="col-span-12 md:col-span-3">
//                 <Image
//                   src={gallery[0]}
//                   alt="Trips Gallery"
//                   width={1200}
//                   height={600}
//                   className="rounded-lg w-full h-64 md:h-80 object-cover"
//                 />
//               </div>

//               {/* Second Image - 6 cols */}
//               <div className="col-span-12 md:col-span-6">
//                 <Image
//                   src={gallery[1]}
//                   alt="Trips Gallery"
//                   width={1200}
//                   height={600}
//                   className="rounded-lg w-full h-64 md:h-80 object-cover"
//                 />
//               </div>

//               {/* Third Image - 3 cols */}
//               <div className="col-span-12 md:col-span-3">
//                 <Image
//                   src={gallery[2]}
//                   alt="Trips Gallery"
//                   width={1200}
//                   height={600}
//                   className="rounded-lg w-full h-64 md:h-80 object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTrip } from "@/services/hooks/trip/useTrip";

export default function TripsDetails() {
  const params = useParams();
  const idParam = params?.id; // string | string[]
  const id = Array.isArray(idParam) ? idParam[0] : idParam; // ensure it's a string
  const { data: trip, isLoading, isError, error } = useTrip(id!);

  const [quantity, setQuantity] = useState(1);
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading) return <p className="text-center mt-10">Loading trip...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {error instanceof Error ? error.message : "Error fetching trip"}
      </p>
    );
  if (!trip) return <p className="text-center mt-10">Trip not found</p>;

  return (
    <div className="container mx-auto my-16 md:my-32">
      {/* Main Details */}
      <div className="grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 md:col-span-5 p-4 md:p-0">
          <Image
            src={trip.images[0]?.url || "/images/default.png"}
            alt={trip.title}
            width={1200}
            height={600}
            className="rounded-lg w-full"
          />
        </div>

        <div className="col-span-12 md:col-span-7 space-y-3 p-4 md:p-0">
          <h1 className="text-[#27303F] text-2xl font-semibold">
            {trip.title}
          </h1>
          <p className="text-[#27303F] text-base font-semibold">
            {new Date(trip.startDate).toLocaleDateString()} -{" "}
            {new Date(trip.endDate).toLocaleDateString()}
          </p>

          <p className="text-[#68706A] text-[14px] font-medium italic">
            {trip.description}
          </p>

          <div className="flex items-center gap-3 pb-4 mt-5">
            <button
              onClick={decrease}
              className="border border-[#68706A] px-3 py-1 cursor-pointer"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={increase}
              className="border border-[#68706A] px-3 py-1 cursor-pointer"
            >
              +
            </button>
            <span className="ml-4 text-lg font-semibold">
              $ {trip.price * quantity}
            </span>
          </div>

          <button
            onClick={() =>
              console.log("Buy Now:", quantity, trip.price * quantity)
            }
            className="bg-[#0694A2] border border-[#0694A2] text-white px-24 py-2 rounded-md cursor-pointer w-full md:w-auto"
          >
            Buy Now
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 p-4 md:p-0">
        <h2 className="text-[#27303F] text-4xl font-semibold mb-6">
          Description
        </h2>
        <p className="text-[#6B7280] text-base">{trip.description}</p>
      </div>

      {/* Gallery */}
      {trip.images.length > 0 && (
        <div className="container mx-auto my-8 md:my-16 p-4 md:p-0">
          <div className="grid grid-cols-12 gap-6">
            {trip.images.map((img, idx) => (
              <div
                key={img._id}
                className={`col-span-12 md:col-span-${trip.images.length === 3 ? [3, 6, 3][idx] : 4}`}
              >
                <Image
                  src={img.url}
                  alt={`Trip Gallery ${idx + 1}`}
                  width={1200}
                  height={600}
                  className="rounded-lg w-full h-64 md:h-80 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
