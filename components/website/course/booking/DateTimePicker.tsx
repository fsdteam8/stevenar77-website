"use client";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "../booking-context";

export function DateTimePicker() {
  const { state, dispatch } = useBooking();

  // ✅ Handle user selecting a date
 const handleDateSelect = (date: Date | undefined) => {
    if (date) dispatch({ type: "SET_DATE", payload: date.toISOString() });
  }; 

  console.log("datea",state.course)
  // ✅ Extract the first active set date from each schedule
  const allowedDates: string[] =
    state.course?.classDates
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
      ?.map((schedule: any) => {
        const firstSet = schedule.sets?.[0]; // take only first set
        if (firstSet?.isActive && firstSet?.date) {
          return new Date(firstSet.date).toDateString(); // store formatted date string
        }
        return null;
      })
      .filter((d: string | null) => d !== null) ?? [];

  console.log("✅ Allowed Dates:", allowedDates);

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Select Date or Time
      </h2>

      <div className="grid md:grid-cols-1 gap-6">
        <Calendar
          mode="single"
          selected={
            state.selectedDate ? new Date(state.selectedDate) : undefined
          }
          onSelect={handleDateSelect}
          className="rounded-md border w-full"
          disabled={(date) => {
            // Disable past dates
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const isPast = date < now;

            // Disable dates not in allowed list
            const notAllowed = !allowedDates.includes(date.toDateString());

            return isPast || notAllowed;
          }}
          classNames={{
            day_selected:
              "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
            day_today: "bg-[#0694a2] text-white",
          }}
        />
      </div>
    </Card>
  );
}



// // booking/DateTimePicker.tsx
// "use client";
// import { Card } from "@/components/ui/card";
// import { Calendar } from "@/components/ui/calendar";
// // import { Button } from "@/components/ui/button";
// import { useBooking } from "../booking-context";

// export function DateTimePicker() {
//   const { state, dispatch } = useBooking();

//   console.log("stevenar", state.course);
//   console.log("datas nanu", state?.course.Schedules);

//   // const availableTimes = [
//   //   "12:00 PM",
//   //   "11:00 AM",
//   //   "10:00 AM",
//   //   "09:00 AM",
//   //   "07:00 AM",
//   //   "06:00 AM",
//   //   "08:00 PM",
//   //   "05:00 PM",
//   // ];

//   const handleDateSelect = (date: Date | undefined) => {
//     if (date) dispatch({ type: "SET_DATE", payload: date.toISOString() });
//   };

//   // const handleTimeSelect = (timeLabel: string) => {
//   //   if (!state.selectedDate) return;

//   //   const [hoursMinutes, modifier] = timeLabel.split(" ");
//   //   const [rawHours, minutes] = hoursMinutes.split(":").map(Number);

//   //   let hours = rawHours;
//   //   if (modifier === "PM" && hours < 12) hours += 12;
//   //   if (modifier === "AM" && hours === 12) hours = 0;

//   //   const selectedDateTime = new Date(state.selectedDate);
//   //   selectedDateTime.setHours(hours, minutes, 0, 0);

//   //   dispatch({
//   //     type: "SET_TIME",
//   //     payload: { label: timeLabel, iso: selectedDateTime.toISOString() },
//   //   });
//   // };

//   return (
//     <Card className="p-6">
//       <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
//         Select Date or Time
//       </h2>
//       <div className="grid md:grid-cols-1 gap-6">
//         {/* Date picker */}
//         <div>
//           {/* <Calendar
//             mode="single"
//             selected={state.selectedDate ? new Date(state.selectedDate) : undefined}
//             onSelect={handleDateSelect}
//             className="rounded-md border w-full"
//             classNames={{
//               day_selected:
//                 "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
//               day_today: "bg-[#0694a2] text-white",
//             }}
//           /> */}

//           <Calendar
//             mode="single"
//             selected={
//               state.selectedDate ? new Date(state.selectedDate) : undefined
//             }
//             onSelect={handleDateSelect}
//             className="rounded-md border w-full"
//             disabled={(date) => {
//               // const allowedDates = (state.course?.Schedules ?? []).map(
//               //   (d: string) => new Date(d).toDateString(),
//               // );
//               const allowedDates = (state.course?.Schedules ?? []).flatMap(
//                 //eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 (schedule: any) =>
//                   (schedule.sets ?? [])
//                     //eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     .filter((s: any) => s.isActive)
//                     //eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     .map((s: any) => new Date(s.date).toDateString()),
//               );

//               const now = new Date();
//               const isPastMonth =
//                 date.getFullYear() < now.getFullYear() ||
//                 (date.getFullYear() === now.getFullYear() &&
//                   date.getMonth() < now.getMonth());

//               return isPastMonth || !allowedDates.includes(date.toDateString());
//             }}
//             classNames={{
//               day_selected:
//                 "bg-[#0694a2] text-white hover:bg-[#0694a2] hover:text-white focus:bg-[#0694a2] focus:text-white",
//               day_today: "bg-[#0694a2] text-white",
//             }}
//           />
//         </div>

//         {/* Time picker */}
//         {/* <div>
//           <h3 className="font-medium mb-3">Available Time</h3>
//           <div className="grid grid-cols-2 gap-2">
//             {availableTimes.map((time, index) => (
//               <Button
//                 key={time + index}
//                 variant={
//                   state.selectedTime?.label === time ? "default" : "outline"
//                 }
//                 size="sm"
//                 onClick={() => handleTimeSelect(time)}
//                 className={
//                   state.selectedTime?.label === time
//                     ? "bg-[#0694a2] hover:bg-[#0694a2]/90"
//                     : ""
//                 }
//               >
//                 {time}
//               </Button>
//             ))}
//           </div>
//         </div> */}
//       </div>
//     </Card>
//   );
// }


