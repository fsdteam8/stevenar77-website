// "use client";

// import { useState } from "react";
// import { CourseCard } from "../course-card";
// import { Pagination } from "../pagination";
// import { CourseDetailModal } from "@/components/modals/course-detail-modal";
// import { useMyBookings } from "@/services/hooks/booking/useBookings";

// // Map API Booking to CourseCard & CourseDetailModal props
// interface ApiBooking {
//   _id: string;
//   classId: {
//     _id: string;
//     title: string;
//     description?: string;
//     image?: { url?: string };
//     courseIncludes?: string[];
//     instructor?: string;
//     rating?: number;
//     reviews?: number;
//   } | string | null; // sometimes classId might be string or null
//   classDate: string[];
//   participant: number;
//   totalPrice: number;
//   status: string;
//   contactPhone?: string;
// }

// interface CourseCardData {
//   id: string;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   location: string;
//   participants: number;
//   price: number;
//   status: "complete" | "pending";
//   imageUrl: string;
//   instructor: string;
//   rating: number;
//   reviews: number;
//   courseIncludes: string[];
//   contactDate: string;
//   contactPhone: string;
// }

// export function CourseHistoryPage() {
//   const { data: bookings = [], isLoading, isError, error } = useMyBookings();
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCourse, setSelectedCourse] = useState<CourseCardData | null>(null);
//   const [highlightedCourse, setHighlightedCourse] = useState<string | null>(null);

//   // Only show "paid" bookings
//   const paidBookings = bookings.filter((b) => b.status === "paid");

//   // Map Booking -> CourseCardData
//   const mappedBookings: CourseCardData[] = paidBookings.map((b) => {
//     const cls = typeof b.classId === "object" && b.classId !== null ? b.classId : {};
//     return {
//       id: b._id,
//       title: cls.title || "Untitled",
//       description: cls.description || "",
//       date: b.classDate?.[0] ? new Date(b.classDate[0]).toDateString() : "Unknown date",
//       time: b.classDate?.[0]
//         ? new Date(b.classDate[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//         : "Unknown time",
//       location: cls.title || "Unknown location",
//       participants: b.participant,
//       price: b.totalPrice,
//       status: "complete", // always mark as complete for display
//       imageUrl: cls.image?.url || "/placeholder.jpg",
//       instructor: cls.instructor || "Instructor N/A",
//       rating: cls.rating || 0,
//       reviews: cls.reviews || 0,
//       courseIncludes: cls.courseIncludes || [],
//       contactDate: b.classDate?.[0] || "",
//       contactPhone: b.contactPhone || "N/A",
//     };
//   });

//   const resultsPerPage = 5;
//   const totalResults = mappedBookings.length;
//   const totalPages = Math.ceil(totalResults / resultsPerPage);

//   const displayedBookings = mappedBookings.slice(
//     (currentPage - 1) * resultsPerPage,
//     currentPage * resultsPerPage
//   );

//   const handleViewCourse = (id: string) => {
//     const course = mappedBookings.find((c) => c.id === id);
//     if (course) {
//       setSelectedCourse(course);
//       setHighlightedCourse(id);
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="space-y-3">
//         {[...Array(resultsPerPage)].map((_, i) => (
//           <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-lg" />
//         ))}
//       </div>
//     );

//   if (isError)
//     return (
//       <p className="text-center py-10 text-red-500">
//         Error: {error?.message}
//       </p>
//     );

//   if (mappedBookings.length === 0)
//     return (
//       <div className="text-center py-20">
//         <p className="text-lg font-medium">You have no paid bookings yet.</p>
//       </div>
//     );

//   return (
//     <div className="container mx-auto px-2 sm:px-0">
//       <div className="space-y-3 sm:space-y-4">
//         {displayedBookings.map((booking) => (
//           <CourseCard
//             key={booking.id}
//             {...booking}
//             isHighlighted={highlightedCourse === booking.id}
//             onView={handleViewCourse}
//           />
//         ))}
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-6 sm:mt-8">
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             totalResults={totalResults}
//             resultsPerPage={resultsPerPage}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       )}

//       <CourseDetailModal
//         course={selectedCourse}
//         isOpen={!!selectedCourse}
//         onClose={() => {
//           setSelectedCourse(null);
//           setHighlightedCourse(null);
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { CourseCard } from "../course-card";
import { Pagination } from "../pagination";
import { CourseDetailModal } from "@/components/modals/course-detail-modal";
import { useMyBookings } from "@/services/hooks/booking/useBookings";

interface CourseCardData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  participants: number;
  price: number;
  status: "complete" | "pending";
  imageUrl: string;
  instructor: string;
  rating: number;
  reviews: number;
  courseIncludes: string[];
  contactDate: string;
  contactPhone: string;
}

export function CourseHistoryPage() {
  const { data: bookings = [], isLoading, isError, error } = useMyBookings();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<CourseCardData | null>(
    null,
  );
  const [highlightedCourse, setHighlightedCourse] = useState<string | null>(
    null,
  );

  // Only show "paid" bookings
  const paidBookings = bookings.filter((b) => b.status === "paid");

  // Map API bookings to CourseCardData
  const mappedBookings: CourseCardData[] = paidBookings.map((b) => {
    type ClassData = {
      title?: string;
      description?: string;
      image?: { url?: string };
      instructor?: string;
      rating?: number;
      reviews?: number;
      courseIncludes?: string[];
    };
    const cls: ClassData =
      typeof b.classId === "object" && b.classId !== null ? (b.classId as ClassData) : {};

    return {
      id: b._id,
      title: cls.title || "Untitled",
      description: cls.description || "",
      date: b.classDate?.[0]
        ? new Date(b.classDate[0]).toDateString()
        : "Unknown date",
      time: b.classDate?.[0]
        ? new Date(b.classDate[0]).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Unknown time",
      location: cls.title || "Unknown location",
      participants: b.participant,
      price: b.totalPrice,
      status: "complete", // always mark as complete for display
      imageUrl: cls.image?.url || "/placeholder.jpg",
      instructor: cls.instructor || "Instructor N/A",
      rating: cls.rating || 0,
      reviews: cls.reviews || 0,
      courseIncludes: cls.courseIncludes || [],
      contactDate: b.classDate?.[0] || "",
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      contactPhone: (b as any).contactPhone || "N/A",
    };
  });

  const resultsPerPage = 5;
  const totalResults = mappedBookings.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const displayedBookings = mappedBookings.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
  );

  const handleViewCourse = (id: string) => {
    const course = mappedBookings.find((c) => c.id === id) || null;
    setSelectedCourse(course);
    setHighlightedCourse(id);
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Error: {error?.message}</p>
    );
  if (mappedBookings.length === 0)
    return (
      <div className="text-center py-20">
        <p className="text-lg font-medium">You have no paid bookings yet.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {displayedBookings.map((booking) => (
          <CourseCard
            key={booking.id}
            {...booking}
            isHighlighted={highlightedCourse === booking.id}
            onView={handleViewCourse}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 sm:mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => {
          setSelectedCourse(null);
          setHighlightedCourse(null);
        }}
      />
    </div>
  );
}
