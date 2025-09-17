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
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card";
import { usePaidTrips } from "@/services/hooks/trip/usePaidTrips";

// Example logged-in user ID
const userId = "68c07c2979ac149b1fe9e309";

export function TripsHistoryPage() {
  const { data: trips = [], isLoading, isError, error } = usePaidTrips(userId);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 5;
  const totalResults = trips.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const displayedTrips = trips.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  if (isLoading)
    return <p className="text-center py-10">Loading trips...</p>;

  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Error: {error?.message}
      </p>
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
              price={tripItem.totalPrice} // mapped from booking
              status="complete"           // all trips are paid
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
