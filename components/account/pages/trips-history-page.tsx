"use client";

import { useState } from "react";

import { TripDetailModal } from "@/components/modals/trip-detail-modal";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card";

const mockTrips = [
  {
    id: "1",
    title: "Bahamas Reef Expedition",
    description: "3-day diving adventure exploring pristine coral reefs",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Nassau, Bahamas",
    participants: 2,
    price: 1299,
    status: "pending" as const,
    imageUrl: "/bahamas-coral-reef-sunset.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "2",
    title: "Bahamas Reef Expedition",
    description: "3-day diving adventure exploring pristine coral reefs",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Nassau, Bahamas",
    participants: 2,
    price: 1299,
    status: "pending" as const,
    imageUrl: "/bahamas-coral-reef-sunset.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "3",
    title: "Bahamas Reef Expedition",
    description: "3-day diving adventure exploring pristine coral reefs",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Nassau, Bahamas",
    participants: 2,
    price: 1299,
    status: "complete" as const,
    imageUrl: "/bahamas-coral-reef-sunset.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "4",
    title: "Bahamas Reef Expedition",
    description: "3-day diving adventure exploring pristine coral reefs",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Nassau, Bahamas",
    participants: 2,
    price: 1299,
    status: "pending" as const,
    imageUrl: "/bahamas-coral-reef-sunset.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
];

export function TripsHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrip, setSelectedTrip] = useState<
    (typeof mockTrips)[0] | null
  >(null);
  const [highlightedTrip, setHighlightedTrip] = useState<string | null>(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    tripId: string | null;
    tripTitle: string;
  }>({
    isOpen: false,
    tripId: null,
    tripTitle: "",
  });

  const resultsPerPage = 5;
  const totalResults = 12;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleViewTrip = (tripId: string) => {
    const trip = mockTrips.find((t) => t.id === tripId);
    if (trip) {
      setSelectedTrip(trip);
      setHighlightedTrip(tripId);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    const trip = mockTrips.find((t) => t.id === tripId);
    if (trip) {
      setDeleteConfirmation({
        isOpen: true,
        tripId,
        tripTitle: trip.title,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.tripId) {
      console.log("Delete trip:", deleteConfirmation.tripId);
    }
    setDeleteConfirmation({
      isOpen: false,
      tripId: null,
      tripTitle: "",
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteConfirmation({
      isOpen: false,
      tripId: null,
      tripTitle: "",
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {mockTrips.map((trip) => (
          <CourseCard
            key={trip.id}
            {...trip}
            isHighlighted={highlightedTrip === trip.id}
            onView={handleViewTrip}
            onDelete={trip.status === "pending" ? handleDeleteTrip : undefined}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <TripDetailModal
        trip={selectedTrip}
        isOpen={!!selectedTrip}
        onClose={() => {
          setSelectedTrip(null);
          setHighlightedTrip(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${deleteConfirmation.tripTitle}"?`}
        itemType="trip"
      />
    </div>
  );
}
