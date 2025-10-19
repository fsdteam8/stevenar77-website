// "use client";

// import { useEffect } from "react";
// import { Card } from "@/components/ui/card";
// import { useBooking } from "../booking-context";
// import { useSearchParams } from "next/navigation";

// export function DateTimePicker() {
//   const { state, dispatch } = useBooking();
//   const searchParams = useSearchParams();

//   // ✅ Step 1: URL থেকে "dates" parameter ধরো
//   const rawDates = searchParams.get("dates");

//   useEffect(() => {
//     if (!rawDates) return;

//     try {
//       // ✅ Step 2: Decode + Parse JSON array
//       const decoded = decodeURIComponent(rawDates);
//       const parsedDates: string[] = JSON.parse(decoded);

//       console.log("🗓️ Dates from URL:", parsedDates);

//   // ✅ Step 3: Context এ সেট করো
//         if (parsedDates && parsedDates.length > 0) {
//           // Reducer expects a single string payload; use the first parsed date
//           dispatch({ type: "SET_DATE", payload: parsedDates[0] });
//         }
//       } catch (err) {
//         console.error("❌ Failed to parse dates from URL:", err);
//       }
//     }, [rawDates, dispatch]);

//   // ✅ Step 4: Context থেকে selectedDate দেখা
//   const selectedDates = Array.isArray(state.selectedDate)
//     ? state.selectedDate
//     : state.selectedDate
//     ? [state.selectedDate]
//     : [];

//   return (
//     <Card className="p-6">
//       <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
//         Selected Date(s)
//       </h2>

//       {selectedDates.length > 0 ? (
//         <ul className="list-disc list-inside text-sm text-gray-700">
//           {selectedDates.map((d, i) => (
//             <li key={i}> adfjasdf {new Date(d).toLocaleString()}</li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-500 text-sm">No date selected from URL</p>
//       )}
//     </Card>
//   );
// }



"use client";

import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useBooking } from "../booking-context";
import { useSearchParams } from "next/navigation";

export function DateTimePicker() {
  const { state, dispatch } = useBooking();
  const searchParams = useSearchParams();

  const rawDates = searchParams.get("dates");

  useEffect(() => {
    if (!rawDates) return;

    try {
      const decoded = decodeURIComponent(rawDates);
      const parsed = JSON.parse(decoded);

      // ✅ Always ensure it's an array
      const parsedDates = Array.isArray(parsed) ? parsed : [parsed];

      console.log("🗓️ Parsed Dates from URL:", parsedDates);

      dispatch({ type: "SET_DATE", payload: parsedDates });
    } catch (err) {
      console.error("❌ Error parsing URL dates:", err);
    }
  }, [rawDates, dispatch]);

  const selectedDates = Array.isArray(state.selectedDate)
    ? state.selectedDate
    : state.selectedDate
      ? [state.selectedDate]
      : [];

  return (
    <Card className="p-6">
      <h2 className="text-xl  font-semibold mb-4 text-[#343a40]">
        Your Selected Training Dates
      </h2>

      {selectedDates.length > 0 ? (
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          {selectedDates.map((date, index) => (
            <li key={index}>
              <span className="text-gray-600">
                Session {index + 1}:
              </span>{" "}
              <span className="font-medium text-xl text-[#212529]">
                {new Date(date).toISOString().split("T")[0]}
              </span>
            </li>
          ))}

          {/* <p className="mt-3 text-sm text-gray-600">
            Please make sure these dates match your availability before continuing.
          </p> */}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">
          No training dates were found in your booking link.
          <br />
          Please go back and select a schedule to continue.
        </p>
      )}
    </Card>
  );
}
