// "use client";

// import { Star } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import { Review } from "@/types/review";

// interface ReviewCardProps {
//   review: Review;
// }

// export function ReviewCard({ review }: ReviewCardProps) {
//   // Concatenate first and last name
//   const fullName = `${review.userId?.firstName} ${review.userId?.lastName}`;
  
//   console.log(review)
//   // Use facility address or fallback to facility name
//   // const location = review?.facility?.address || review?.facility?.name;
  
//   return (
//     <Card className="w-full h-full overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow duration-300">
//       <CardContent className="p-4 ">
//         {/* Header */}
//         <div className="space-y-4 lg:space-y-8 ">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-1">
//               <Image
//                 // src={ {} ||'/images/profile-mini.jpg'}
//                 src={review?.userId?.image?.url || '/images/profile-mini.jpg'}
//                 alt="profile image"
//                 width={70}
//                 height={70}
//                 className="aspect-square rounded-full object-cover"
//               />
//               <div className="">
//                 <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight">
//                   {fullName}
//                 </h3>
//                 {/* <p className="flex flex-row text-sm text-gray-600">
//                   {location}, {review?.facility?.address}
//                 </p> */}
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, index) =>
//                   index < review.star ? (
//                     <Star
//                       key={index}
//                       aria-label="Full star"
//                       className="w-4 h-4 fill-yellow-400 text-yellow-400"
//                     />
//                   ) : (
//                     <Star
//                       key={index}
//                       aria-label="Empty star"
//                       className="w-4 h-4 text-gray-300"
//                     />
//                   )
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="flex items-center gap-1 text-gray-600 italic">
//             <span className="text-sm">{review.comment}</span>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


"use client";

import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Review } from "@/types/review";
import { format } from "date-fns";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const fullName = `${review.userId?.firstName} ${review.userId?.lastName}`;

  // Format the review creation date
  const createdAtDate = review.createdAt
    ? format(new Date(review.createdAt), "dd MMM yyyy, hh:mm a")
    : "Unknown date";

  // Format the purchase date
  const purchaseDateFormatted = review.purchaseDate
    ? format(new Date(review.purchaseDate), "dd MMM yyyy")
    : "Unknown purchase date";

  return (
    <Card className="w-full h-full overflow-hidden bg-white shadow-xs hover:shadow-sm transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="space-y-4 lg:space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Image
                src={review?.userId?.image?.url || "/images/profile-mini.jpg"}
                alt="profile image"
                width={70}
                height={70}
                className="aspect-square rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-gray-900 leading-tight">
                  {fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {/* Reviewed: {createdAtDate} */}
                </p>
                <p className="text-sm text-gray-500">
                  Purchased: {purchaseDateFormatted}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) =>
                  index < review.star ? (
                    <Star
                      key={index}
                      aria-label="Full star"
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ) : (
                    <Star
                      key={index}
                      aria-label="Empty star"
                      className="w-4 h-4 text-gray-300"
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 text-gray-600 italic">
            <span className="text-sm">{review.comment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
