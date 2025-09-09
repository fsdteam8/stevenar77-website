"use client";

import { useState } from "react";

import { CourseDetailModal } from "@/components/modals/course-detail-modal";
import { DeleteConfirmationModal } from "@/components/modals/delete-confirmation-modal";
import { CourseCard } from "../course-card";
import { Pagination } from "../pagination";

const mockCourses = [
  {
    id: "1",
    title: "Advances Open Water Diver",
    description:
      "Continue your adventure with 5 adventure dives to enhance your skills.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Catalina Island",
    participants: 1,
    price: 349,
    status: "complete" as const,
    imageUrl: "/underwater-scuba-diving.png",
    instructor: 'Steve "Scuba SteveNar"',
    rating: 4.8,
    reviews: 32,
    courseIncludes: [
      "Pool training session",
      "Basic equipment included",
      "Professional instruction",
      "Certificate of participation",
    ],
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "2",
    title: "Advances Open Water Diver",
    description:
      "Continue your adventure with 5 adventure dives to enhance your skills.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Catalina Island",
    participants: 1,
    price: 349,
    status: "pending" as const,
    imageUrl: "/underwater-scuba-diving.png",
    instructor: 'Steve "Scuba SteveNar"',
    rating: 4.8,
    reviews: 32,
    courseIncludes: [
      "Pool training session",
      "Basic equipment included",
      "Professional instruction",
      "Certificate of participation",
    ],
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "3",
    title: "Advances Open Water Diver",
    description:
      "Continue your adventure with 5 adventure dives to enhance your skills.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Catalina Island",
    participants: 1,
    price: 349,
    status: "complete" as const,
    imageUrl: "/images/diving.png",
    instructor: 'Steve "Scuba SteveNar"',
    rating: 4.8,
    reviews: 32,
    courseIncludes: [
      "Pool training session",
      "Basic equipment included",
      "Professional instruction",
      "Certificate of participation",
    ],
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "4",
    title: "Advances Open Water Diver",
    description:
      "Continue your adventure with 5 adventure dives to enhance your skills.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "Catalina Island",
    participants: 1,
    price: 349,
    status: "pending" as const,
    imageUrl: "/underwater-scuba-diving.png",
    instructor: 'Steve "Scuba SteveNar"',
    rating: 4.8,
    reviews: 32,
    courseIncludes: [
      "Pool training session",
      "Basic equipment included",
      "Professional instruction",
      "Certificate of participation",
    ],
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
];

export function CourseHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<
    (typeof mockCourses)[0] | null
  >(null);
  const [highlightedCourse, setHighlightedCourse] = useState<string | null>(
    null
  );
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    courseId: string | null;
    courseTitle: string;
  }>({
    isOpen: false,
    courseId: null,
    courseTitle: "",
  });

  const resultsPerPage = 5;
  const totalResults = 12;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleViewCourse = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setHighlightedCourse(courseId);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    const course = mockCourses.find((c) => c.id === courseId);
    if (course) {
      setDeleteConfirmation({
        isOpen: true,
        courseId,
        courseTitle: course.title,
      });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteConfirmation.courseId) {
      console.log("Delete course:", deleteConfirmation.courseId);
    }
    setDeleteConfirmation({
      isOpen: false,
      courseId: null,
      courseTitle: "",
    });
  };

  const handleCloseDeleteModal = () => {
    setDeleteConfirmation({
      isOpen: false,
      courseId: null,
      courseTitle: "",
    });
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {mockCourses.map((course) => (
          <CourseCard
            key={course.id}
            {...course}
            isHighlighted={highlightedCourse === course.id}
            onView={handleViewCourse}
            onDelete={
              course.status === "pending" ? handleDeleteCourse : undefined
            }
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

      <CourseDetailModal
        course={selectedCourse}
        isOpen={!!selectedCourse}
        onClose={() => {
          setSelectedCourse(null);
          setHighlightedCourse(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={deleteConfirmation.isOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete "${deleteConfirmation.courseTitle}"?`}
        itemType="course"
      />
    </div>
  );
}
