"use client"

import { useState } from "react"
import { CalendarFilters } from "./calendar/calendar-filters"
import { CalendarHeader } from "./calendar/calendar-header"
import { CalendarGrid } from "./calendar/calendar-grid"


interface Session {
  id: string
  title: string
  time: string
  price: string
  day: number
}

const sessions: Session[] = [
  { id: "1", title: "Open Water Diver", time: "09:00", price: "$423", day: 7 },
  { id: "2", title: "Open Water Diver", time: "09:00", price: "$423", day: 10 },
  { id: "3", title: "Open Water Diver", time: "09:00", price: "$423", day: 27 },
]

const months = [
  { name: "September 2025", days: 30, startDay: 0 }, // September 1, 2025 is a Monday (0 = Sunday offset)
  { name: "October 2025", days: 31, startDay: 3 },
  { name: "November 2025", days: 30, startDay: 6 },
  { name: "December 2025", days: 31, startDay: 1 },
]

export default function AvailableSessionsPage() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0)
  const [courseType, setCourseType] = useState("all")
  const [instructor, setInstructor] = useState("all")

  const currentMonth = months[currentMonthIndex]

  const handlePreviousMonth = () => {
    setCurrentMonthIndex((prev) => (prev > 0 ? prev - 1 : months.length - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonthIndex((prev) => (prev < months.length - 1 ? prev + 1 : 0))
  }

  const filteredSessions = sessions.filter((session) => {
    if (courseType !== "all" && !session.title.toLowerCase().includes(courseType.replace("-", " "))) {
      return false
    }
    return true
  })

  return (
    <div className="p-3 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6">Available Sessions</h1>

      {/* Filters */}
      <CalendarFilters
        courseType={courseType}
        instructor={instructor}
        onCourseTypeChange={setCourseType}
        onInstructorChange={setInstructor}
      />

      {/* Calendar Header */}
      <CalendarHeader
        currentMonth={currentMonth.name}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
      />

      {/* Calendar Grid */}
      <CalendarGrid sessions={filteredSessions} daysInMonth={currentMonth.days} startDay={currentMonth.startDay} />
    </div>
  )
}
