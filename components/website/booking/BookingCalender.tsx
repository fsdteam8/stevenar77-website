"use client";
import React, { useState } from "react";

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1)); // February 2025
  
  const daysInMonth = 28; // February 2025 has 28 days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
  const getDayOfWeek = (day: number) => {
    const date = new Date(2025, 1, day);
    return date.getDay(); // 0 = Sunday, 1 = Monday, etc.
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(2025, 1, day);
    onDateSelect(date);
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-[#27303F]">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button 
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          >
            ←
          </button>
          <button 
            className="p-1 text-gray-500 hover:bg-gray-100 rounded"
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          >
            →
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
        
        {/* Empty cells for days before the 1st */}
        {Array.from({ length: getDayOfWeek(1) }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8"></div>
        ))}
        
        {/* Days of the month */}
        {days.map(day => (
          <button
            type="button"
            key={day} 
            className={`h-8 flex items-center justify-center text-sm rounded-md transition ${
              isSelected(day)
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleDateSelect(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;