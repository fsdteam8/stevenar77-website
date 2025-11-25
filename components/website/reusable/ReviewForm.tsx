// "use client";
// import React, { useState, useEffect } from "react";
// import { Star } from "lucide-react";
// import { toast } from "sonner";

// // Types
// export interface ReviewData {
//   rating: number;
//   description: string;
//   purchaseDate: string;
// }

// export interface SubmitStatus {
//   type: "success" | "error";
//   message: string;
// }

// interface ReviewFormProps {
//   onSubmit?: (data: ReviewData) => Promise<void> | void;
//   initialData?: Partial<ReviewData>;
//   isSubmitting?: boolean;
//   submitStatus?: SubmitStatus | null;
// }

// const ReviewForm: React.FC<ReviewFormProps> = ({
//   onSubmit,
//   initialData = {},
//   isSubmitting = false,
//   submitStatus = null,
// }) => {
//   const [purchaseMonth, setPurchaseMonth] = useState("");
//   const [purchaseYear, setPurchaseYear] = useState("");

//   const [rating, setRating] = useState<number>(initialData.rating ?? 0);
//   const [hoveredRating, setHoveredRating] = useState<number>(0);
//   const [description, setDescription] = useState<string>(
//     initialData.description ?? "",
//   );
//   const purchaseDate = new Date(
//     `${purchaseYear}-${purchaseMonth}-01T00:00:00Z`,
//   ).toISOString();

//   const handleSubmit = async () => {
//     if (rating === 0) {
//       toast.error("Please select a rating");
//       return;
//     }

//     if (!description.trim()) {
//       toast.error("Please enter a description");
//       return;
//     }

//     if (!purchaseMonth || !purchaseYear) {
//       toast.error("Please select purchase month and year");
//       return;
//     }

// // SAFE: we only calculate after validating values
// const isValid = purchaseYear && purchaseMonth;

// const purchaseDateStr = isValid
//   ? new Date(Date.UTC(Number(purchaseYear), Number(purchaseMonth) - 1, 1)).toISOString()
//   : "";

// if (onSubmit && !isSubmitting) {
//   await onSubmit({
//     rating,
//     description,
//     purchaseDate: purchaseDateStr,
//   });
// }
//   };

//   // Clear form on successful submission
//   useEffect(() => {
//     if (submitStatus?.type === "success") {
//       setRating(0);
//       setDescription("");
//     }
//   }, [submitStatus]);

//   return (
//     <div className="container mx-auto">
//       <div className="sm:max-w-7xl max-w-xl border rounded-md mx-auto p-6 bg-white">
//         <div className="grid grid-cols-1  gap-8">
//           {/* Left side - Review Form */}
//           <div>
//             <h2 className="text-2xl font-semibold text-gray-900 mb-6">
//               Reviews
//             </h2>

//             <div className="space-y-6">
//               <div>
//                 <div className="block text-sm font-medium text-gray-700 mb-3">
//                   How happy are you with our service
//                 </div>

//                 {/* Star Rating */}
//                 <div className="flex space-x-1 mb-6">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <div
//                       key={star}
//                       className="p-1 cursor-pointer transition-colors duration-200"
//                       onMouseEnter={() => setHoveredRating(star)}
//                       onMouseLeave={() => setHoveredRating(0)}
//                       onClick={() => setRating(star)}
//                     >
//                       <Star
//                         size={32}
//                         className={`transition-colors duration-200 ${
//                           star <= (hoveredRating || rating)
//                             ? "fill-yellow-400 text-yellow-400"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="">
//                 <div>
//                   <div className="block text-sm font-medium text-gray-700 mb-2">
//                     Purchase Date (Month & Year)
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     {/* Month */}
//                     <select
//                       value={purchaseMonth}
//                       onChange={(e) => setPurchaseMonth(e.target.value)}
//                       className="border rounded-md px-3 py-2"
//                     >
//                       <option value="">Select Month</option>
//                       {[
//                         "01",
//                         "02",
//                         "03",
//                         "04",
//                         "05",
//                         "06",
//                         "07",
//                         "08",
//                         "09",
//                         "10",
//                         "11",
//                         "12",
//                       ].map((m) => (
//                         <option key={m} value={m}>
//                           {m}
//                         </option>
//                       ))}
//                     </select>

//                     {/* Year */}
//                     <select
//                       value={purchaseYear}
//                       onChange={(e) => setPurchaseYear(e.target.value)}
//                       className="border rounded-md px-3 py-2"
//                     >
//                       <option value="">Select Year</option>
//                       {Array.from({ length: 20 }, (_, i) => 2025 - i).map(
//                         (y) => (
//                           <option key={y} value={y}>
//                             {y}
//                           </option>
//                         ),
//                       )}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="block text-sm font-medium text-gray-700 mb-2">
//                   Description
//                 </div>
//                 <textarea
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   placeholder="Write your review here..."
//                   rows={4}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
//                 />
//               </div>

//               {/* Status Messages */}
//               {/* {submitStatus && (
//                 <div
//                   className={`p-4 rounded-md ${
//                     submitStatus.type === "success"
//                       ? "bg-green-50 border border-green-200 text-green-800"
//                       : "bg-red-50 border border-red-200 text-red-800"
//                   }`}
//                 >
//                   {submitStatus.message}
//                 </div>
//               )} */}

//               <div
//                 onClick={handleSubmit}
//                 className={`w-full font-medium py-3 px-4 rounded-md transition-colors duration-200 cursor-pointer text-center ${
//                   isSubmitting
//                     ? "bg-gray-400 text-white cursor-not-allowed"
//                     : "bg-teal-600 hover:bg-teal-700 text-white"
//                 }`}
//               >
//                 {isSubmitting ? "Submitting..." : "Submit Review"}
//               </div>
//             </div>
//           </div>

//           {/* Right side - Review Statistics */}
//           {/* <div className="lg:pl-8">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="flex">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <Star
//                     key={star}
//                     size={24}
//                     className="fill-yellow-400 text-yellow-400"
//                   />
//                 ))}
//               </div>
//               <span className="text-2xl font-semibold text-gray-900">
//                 {reviewStats.averageRating}
//               </span>
//             </div>

//             <p className="text-gray-600 mb-6">
//               Based on {reviewStats.totalReviews.toLocaleString()} reviews
//             </p>

//             <div className="space-y-3">
//               {reviewStats.breakdown.map((item) => (
//                 <div key={item.stars} className="flex items-center gap-3">
//                   <span className="text-sm font-medium text-gray-700 w-12">
//                     {item.stars} Stars
//                   </span>
//                   <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
//                     <div
//                       className="h-full bg-yellow-400 transition-all duration-300"
//                       style={{ width: `${getBarWidth(item.count)}%` }}
//                     />
//                   </div>
//                   <span className="text-sm font-medium text-gray-700 w-12 text-right">
//                     {item.count}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewForm;

"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

export interface ReviewData {
  rating: number;
  description: string;
  purchaseDate: string;
}

export interface SubmitStatus {
  type: "success" | "error";
  message: string;
}

interface ReviewFormProps {
  onSubmit?: (data: ReviewData) => Promise<void> | void;
  initialData?: Partial<ReviewData>;
  isSubmitting?: boolean;
  submitStatus?: SubmitStatus | null;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  onSubmit,
  initialData = {},
  isSubmitting = false,
  submitStatus = null,
}) => {
  const [purchaseMonth, setPurchaseMonth] = useState("");
  const [purchaseYear, setPurchaseYear] = useState("");

  const [rating, setRating] = useState<number>(initialData.rating ?? 0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [description, setDescription] = useState<string>(
    initialData.description ?? "",
  );

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    if (!purchaseMonth || !purchaseYear) {
      toast.error("Please select purchase month and year");
      return;
    }

    // Generate safe purchaseDate
    const isValid = purchaseYear && purchaseMonth;

    const purchaseDateStr = isValid
      ? new Date(
          Date.UTC(Number(purchaseYear), Number(purchaseMonth) - 1, 1),
        ).toISOString()
      : "";

    if (onSubmit && !isSubmitting) {
      await onSubmit({
        rating,
        description,
        purchaseDate: purchaseDateStr,
      });
    }
  };

  useEffect(() => {
    if (submitStatus?.type === "success") {
      setRating(0);
      setDescription("");
      setPurchaseMonth("");
      setPurchaseYear("");
    }
  }, [submitStatus]);

  return (
    <div className="container mx-auto px-2">
      <div className="sm:max-w-7xl max-w-xl border rounded-md mx-auto p-6   sm:px-6 bg-white">
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Reviews
            </h2>

            <div className="space-y-6">
              <div className="">
                <p>
                  Tell us about your class! Your review helps future divers
                  choose their next adventure.
                </p>
              </div>
              {/* Star Rating */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-3">
                  How happy are you with our service
                </div>

                <div className="flex space-x-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="p-1 cursor-pointer transition-colors duration-200"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={32}
                        className={`transition-colors duration-200 ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Purchase Date */}
              <div className="sm:flex gap-4 justify-start items-center">
                <div className="block text-base font-medium text-gray-700 mb-2">
                  Please select the month and year you took your class
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={purchaseMonth}
                    onChange={(e) => setPurchaseMonth(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >
                    {/* <option value="">Select Month</option> */}
                    <option value="">Select Month</option>
                    {[
                      { code: "01", name: "January" },
                      { code: "02", name: "February" },
                      { code: "03", name: "March" },
                      { code: "04", name: "April" },
                      { code: "05", name: "May" },
                      { code: "06", name: "June" },
                      { code: "07", name: "July" },
                      { code: "08", name: "August" },
                      { code: "09", name: "September" },
                      { code: "10", name: "October" },
                      { code: "11", name: "November" },
                      { code: "12", name: "December" },
                    ].map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={purchaseYear}
                    onChange={(e) => setPurchaseYear(e.target.value)}
                    className="border rounded-md px-3 py-2"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 20 }, (_, i) => 2025 - i).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review 
                </div>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your review here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              {/* Submit Button */}
              <div
                onClick={handleSubmit}
                className={`w-full font-medium py-3 px-4 rounded-md text-center cursor-pointer ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700 text-white"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
