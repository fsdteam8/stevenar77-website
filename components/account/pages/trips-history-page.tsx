// "use client";

// import { useState } from "react";

// import { TripDetailModal } from "@/components/modals/trip-detail-modal";
// import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
// import { Pagination } from "../pagination";
// import { CourseCard } from "../course-card";

// const mockTrips = [
//   {
//     id: "1",
//     title: "Bahamas Reef Expedition",
//     description: "3-day diving adventure exploring pristine coral reefs",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Nassau, Bahamas",
//     participants: 2,
//     price: 1299,
//     status: "pending" as const,
//     imageUrl: "/bahamas-coral-reef-sunset.jpg",
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "2",
//     title: "Bahamas Reef Expedition",
//     description: "3-day diving adventure exploring pristine coral reefs",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Nassau, Bahamas",
//     participants: 2,
//     price: 1299,
//     status: "pending" as const,
//     imageUrl: "/bahamas-coral-reef-sunset.jpg",
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "3",
//     title: "Bahamas Reef Expedition",
//     description: "3-day diving adventure exploring pristine coral reefs",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Nassau, Bahamas",
//     participants: 2,
//     price: 1299,
//     status: "complete" as const,
//     imageUrl: "/bahamas-coral-reef-sunset.jpg",
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
//   {
//     id: "4",
//     title: "Bahamas Reef Expedition",
//     description: "3-day diving adventure exploring pristine coral reefs",
//     date: "Thursday, September 24",
//     time: "09:00 AM",
//     location: "Nassau, Bahamas",
//     participants: 2,
//     price: 1299,
//     status: "pending" as const,
//     imageUrl: "/bahamas-coral-reef-sunset.jpg",
//     contactDate: "Thursday, September 24",
//     contactPhone: "+123456789",
//   },
// ];

// export function TripsHistoryPage() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTrip, setSelectedTrip] = useState<
//     (typeof mockTrips)[0] | null
//   >(null);
//   const [highlightedTrip, setHighlightedTrip] = useState<string | null>(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     tripId: string | null;
//     tripTitle: string;
//   }>({
//     isOpen: false,
//     tripId: null,
//     tripTitle: "",
//   });

//   const resultsPerPage = 5;
//   const totalResults = 12;
//   const totalPages = Math.ceil(totalResults / resultsPerPage);

//   const handleViewTrip = (tripId: string) => {
//     const trip = mockTrips.find((t) => t.id === tripId);
//     if (trip) {
//       setSelectedTrip(trip);
//       setHighlightedTrip(tripId);
//     }
//   };

//   const handleDeleteTrip = (tripId: string) => {
//     const trip = mockTrips.find((t) => t.id === tripId);
//     if (trip) {
//       setDeleteConfirmation({
//         isOpen: true,
//         tripId,
//         tripTitle: trip.title,
//       });
//     }
//   };

//   const handleConfirmDelete = () => {
//     if (deleteConfirmation.tripId) {
//       console.log("Delete trip:", deleteConfirmation.tripId);
//     }
//     setDeleteConfirmation({
//       isOpen: false,
//       tripId: null,
//       tripTitle: "",
//     });
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteConfirmation({
//       isOpen: false,
//       tripId: null,
//       tripTitle: "",
//     });
//   };

//   return (
//     <div className="container mx-auto px-2 sm:px-0">
//       <div className="space-y-3 sm:space-y-4">
//         {mockTrips.map((trip) => (
//           <CourseCard
//             key={trip.id}
//             {...trip}
//             isHighlighted={highlightedTrip === trip.id}
//             onView={handleViewTrip}
//             onDelete={trip.status === "pending" ? handleDeleteTrip : undefined}
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

//       <TripDetailModal
//         trip={selectedTrip}
//         isOpen={!!selectedTrip}
//         onClose={() => {
//           setSelectedTrip(null);
//           setHighlightedTrip(null);
//         }}
//       />

//       <DeleteConfirmationModal
//         isOpen={deleteConfirmation.isOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={handleConfirmDelete}
//         message={`Are you sure you want to delete "${deleteConfirmation.tripTitle}"?`}
//         itemType="trip"
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card";
import { Skeleton } from "@/components/ui/skeleton";
import { usePaidTrips } from "@/services/hooks/trip/usePaidTrips";

export function TripsHistoryPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id; // get logged-in user ID from session

  const { data: trips = [], isLoading, isError, error } = usePaidTrips(userId || "");

  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 5;
  const totalResults = trips.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const displayedTrips = trips.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  // Loading skeleton using ShadCN Skeleton
  if (status === "loading" || isLoading)
    return (
      <div className="container mx-auto px-2 sm:px-0 space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4 animate-pulse gap-4">
            <Skeleton className="w-full sm:w-24 h-48 sm:h-24 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-6 w-1/4 rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    );

  // Not logged in
  if (!userId)
    return <p className="text-center py-10 text-red-500">Please log in to see your trips.</p>;

  // Error
  if (isError)
    return (
      <div className="container mx-auto px-2 sm:px-0">
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <p className="text-gray-600 text-lg">You haven&apos;t booked any trips yet.</p>
        </div>
      </div>
    );

  // No trips booked
  if (!trips.length)
    return (
      <div className="container mx-auto px-2 sm:px-0">
        <div className="p-6 bg-white rounded-lg shadow text-center">
          <p className="text-gray-600 text-lg">You haven&apos;t booked any trips yet.</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {displayedTrips.map((tripItem) => {
          const trip = tripItem.trip;
          return (
            <CourseCard
              key={trip._id}
              id={trip._id}
              title={trip.title}
              description={trip.description}
              date={new Date(trip.startDate).toDateString()}
              time={new Date(trip.startDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              location={trip.location}
              participants={tripItem.participants.length}
              price={tripItem.totalPrice} // all trips are paid
              status="complete"           
              imageUrl={trip.images[0]?.url || "/placeholder.jpg"}
            />
          );
        })}
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
    </div>
  );
}
