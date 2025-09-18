// "use client";

// import { useState } from "react";

// import { CourseDetailModal } from "@/components/modals/course-detail-modal";
// import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
// import { CourseCard } from "../course-card";
// import { Pagination } from "../pagination";

// const mockCourses = [
//   {
//     id: "1",
//     title: "Advances Open Water Diver",
//     description:
//       "Continue your adventure with 5 adventure dives to enhance your skills.",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Catalina Island",
//     participants: 1,
//     price: 349,
//     status: "complete" as const,
//     imageUrl: "/underwater-scuba-diving.png",
//     instructor: 'Steve "Scuba SteveNar"',
//     rating: 4.8,
//     reviews: 32,
//     courseIncludes: [
//       "Pool training session",
//       "Basic equipment included",
//       "Professional instruction",
//       "Certificate of participation",
//     ],
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "2",
//     title: "Advances Open Water Diver",
//     description:
//       "Continue your adventure with 5 adventure dives to enhance your skills.",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Catalina Island",
//     participants: 1,
//     price: 349,
//     status: "pending" as const,
//     imageUrl: "/underwater-scuba-diving.png",
//     instructor: 'Steve "Scuba SteveNar"',
//     rating: 4.8,
//     reviews: 32,
//     courseIncludes: [
//       "Pool training session",
//       "Basic equipment included",
//       "Professional instruction",
//       "Certificate of participation",
//     ],
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "3",
//     title: "Advances Open Water Diver",
//     description:
//       "Continue your adventure with 5 adventure dives to enhance your skills.",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Catalina Island",
//     participants: 1,
//     price: 349,
//     status: "complete" as const,
//     imageUrl: "/images/diving.png",
//     instructor: 'Steve "Scuba SteveNar"',
//     rating: 4.8,
//     reviews: 32,
//     courseIncludes: [
//       "Pool training session",
//       "Basic equipment included",
//       "Professional instruction",
//       "Certificate of participation",
//     ],
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "4",
//     title: "Advances Open Water Diver",
//     description:
//       "Continue your adventure with 5 adventure dives to enhance your skills.",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Catalina Island",
//     participants: 1,
//     price: 349,
//     status: "pending" as const,
//     imageUrl: "/underwater-scuba-diving.png",
//     instructor: 'Steve "Scuba SteveNar"',
//     rating: 4.8,
//     reviews: 32,
//     courseIncludes: [
//       "Pool training session",
//       "Basic equipment included",
//       "Professional instruction",
//       "Certificate of participation",
//     ],
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
// ];

// export function CourseHistoryPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCourse, setSelectedCourse] = useState<
//     (typeof mockCourses)[0] | null
//   >(null);
//   const [highlightedCourse, setHighlightedCourse] = useState<string | null>(
//     null
//   );
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     courseId: string | null;
//     courseTitle: string;
//   }>({
//     isOpen: false,
//     courseId: null,
//     courseTitle: "",
//   });

//   const resultsPerPage = 5;
//   const totalResults = 12;
//   const totalPages = Math.ceil(totalResults / resultsPerPage);

//   const handleViewCourse = (courseId: string) => {
//     const course = mockCourses.find((c) => c.id === courseId);
//     if (course) {
//       setSelectedCourse(course);
//       setHighlightedCourse(courseId);
//     }
//   };

//   const handleDeleteCourse = (courseId: string) => {
//     const course = mockCourses.find((c) => c.id === courseId);
//     if (course) {
//       setDeleteConfirmation({
//         isOpen: true,
//         courseId,
//         courseTitle: course.title,
//       });
//     }
//   };

//   const handleConfirmDelete = () => {
//     if (deleteConfirmation.courseId) {
//       console.log("Delete course:", deleteConfirmation.courseId);
//     }
//     setDeleteConfirmation({
//       isOpen: false,
//       courseId: null,
//       courseTitle: "",
//     });
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteConfirmation({
//       isOpen: false,
//       courseId: null,
//       courseTitle: "",
//     });
//   };

//   return (
//     <div className="container mx-auto px-2 sm:px-0">
//       <div className="space-y-3 sm:space-y-4">
//         {mockCourses.map((course) => (
//           <CourseCard
//             key={course.id}
//             {...course}
//             isHighlighted={highlightedCourse === course.id}
//             onView={handleViewCourse}
//             onDelete={
//               course.status === "pending" ? handleDeleteCourse : undefined
//             }
//           />
//         ))}
//       </div>

//       <div className="mt-6 sm:mt-8">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           totalResults={totalResults}
//           resultsPerPage={resultsPerPage}
//           onPageChange={setCurrentPage}
//         />
//       </div>

//       <CourseDetailModal
//         course={selectedCourse}
//         isOpen={!!selectedCourse}
//         onClose={() => {
//           setSelectedCourse(null);
//           setHighlightedCourse(null);
//         }}
//       />

//       <DeleteConfirmationModal
//         isOpen={deleteConfirmation.isOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={handleConfirmDelete}
//         message={`Are you sure you want to delete "${deleteConfirmation.courseTitle}"?`}
//         itemType="course"
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

// Map API Booking to CourseCard & CourseDetailModal props
interface ApiBooking {
  _id: string;
  classId: {
    _id: string;
    title: string;
    description?: string;
    image?: { url?: string };
    courseIncludes?: string[];
    instructor?: string;
    rating?: number;
    reviews?: number;
  } | string | null; // sometimes classId might be string or null
  classDate: string[];
  participant: number;
  totalPrice: number;
  status: string;
  contactPhone?: string;
}

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
  const [selectedCourse, setSelectedCourse] = useState<CourseCardData | null>(null);
  const [highlightedCourse, setHighlightedCourse] = useState<string | null>(null);

  // Only show "paid" bookings
  const paidBookings = bookings.filter((b) => b.status === "paid");

  // Map Booking -> CourseCardData
  const mappedBookings: CourseCardData[] = paidBookings.map((b) => {
    const cls = typeof b.classId === "object" && b.classId !== null ? b.classId : {};
    return {
      id: b._id,
      title: cls.title || "Untitled",
      description: cls.description || "",
      date: b.classDate?.[0] ? new Date(b.classDate[0]).toDateString() : "Unknown date",
      time: b.classDate?.[0]
        ? new Date(b.classDate[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
      contactPhone: b.contactPhone || "N/A",
    };
  });

  const resultsPerPage = 5;
  const totalResults = mappedBookings.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const displayedBookings = mappedBookings.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleViewCourse = (id: string) => {
    const course = mappedBookings.find((c) => c.id === id);
    if (course) {
      setSelectedCourse(course);
      setHighlightedCourse(id);
    }
  };

  if (isLoading)
    return (
      <div className="space-y-3">
        {[...Array(resultsPerPage)].map((_, i) => (
          <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-lg" />
        ))}
      </div>
    );

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error?.message}
      </p>
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
