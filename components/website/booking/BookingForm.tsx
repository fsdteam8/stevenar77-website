import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookingData, Course } from "@/lib/type";


interface BookingFormProps {
  course: Course;
  onSubmit: (data: BookingData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ course, onSubmit }) => {
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [participants, setParticipants] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    medicalConditions: "",
  });

  const availableTimes = ["12:40 AM", "10:00 AM", "11:00 AM", "01:00 PM", "09:00 PM"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      participants,
      selectedTime,
      course: course.title,
      totalPrice: course.price * participants,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="font-medium text-sm text-[#27303F] mb-2">Available Time</h4>
        <div className="flex flex-wrap gap-2">
          {availableTimes.map(time => (
            <button
              key={time}
              type="button"
              className={`px-3 py-2 border rounded-md text-sm transition ${
                selectedTime === time
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-blue-50 hover:border-blue-200"
              }`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium text-sm text-[#27303F] mb-2">Number of Participants</h4>
        <div className="flex items-center border border-gray-300 rounded-md w-24">
          <button type="button" className="px-3 py-2 text-gray-500" onClick={() => setParticipants(Math.max(1, participants - 1))}>-</button>
          <span className="px-3 py-2">{participants}</span>
          <button type="button" className="px-3 py-2 text-gray-500" onClick={() => setParticipants(participants + 1)}>+</button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm text-[#27303F]">Personal Information</h4>
        <div>
          <label className="block text-sm text-[#68706A] mb-1">Name</label>
          <input type="text" name="name" placeholder="Full name" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm text-[#68706A] mb-1">Email Address</label>
          <input type="email" name="email" placeholder="Email address" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm text-[#68706A] mb-1">Phone Number</label>
          <input type="tel" name="phone" placeholder="1234567890" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm text-[#68706A] mb-1">Medical Conditions</label>
          <textarea name="medicalConditions" placeholder="Any medical conditions we should know about" className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm h-20" value={formData.medicalConditions} onChange={handleInputChange} />
        </div>
      </div>

      <Button type="submit" className="w-full text-white py-3 rounded-md font-medium transition disabled:bg-gray-400" disabled={!selectedTime || !formData.name || !formData.email || !formData.phone}>
        Complete Booking
      </Button>
    </form>
  );
};

export default BookingForm;
