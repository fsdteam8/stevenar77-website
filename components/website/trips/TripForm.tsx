// TripForm.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTripBooking as useTripBookingContext } from "../course/steps/TripBookingContext";
import { useSession } from "next-auth/react";
import { Trip } from "@/services/hooks/trip/useTrip";
import { useTripBooking } from "@/hooks/useTripBooking";
import { toast } from "sonner";

// Schema for one participant
const participantSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(6, "Phone must be at least 6 digits")
    .max(15, "Phone must be at most 15 digits"),
  email: z.string().email("Invalid email"),
});

const tripSchema = z.object({
  participants: z.number().min(1, "At least 1 participant required"),
  participantDetails: z.array(participantSchema),
});

type TripFormValues = z.infer<typeof tripSchema>;

interface TripFormProps {
  trip: Trip;
}



export function TripForm({ trip }: TripFormProps) {
  const { state, dispatch } = useTripBookingContext();
  const { mutate: bookTrip } = useTripBooking();
  const [tripsBookings, setTripsBookings] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const { data: session } = useSession();
  const userId = session?.user?.id as string | undefined;



  const searchParams = useSearchParams();
  const queryParticipants =
    Number(searchParams.get("q")) || state.participants || 1;

  const itemId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").pop()
      : "";

  // Form setup
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      participants: queryParticipants,
      participantDetails: Array.from({ length: queryParticipants }, () => ({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "participantDetails",
  });

  // Adjust inputs when participant count changes
  useEffect(() => {
    const count = form.getValues("participants");
    const currentLength = fields.length;

    if (count > currentLength) {
      for (let i = currentLength; i < count; i++) {
        append({ firstName: "", lastName: "", phone: "", email: "" });
      }
    } else if (count < currentLength) {
      for (let i = currentLength; i > count; i--) {
        remove(i - 1);
      }
    }
  }, [form.watch("participants")]);

  // SUBMIT HANDLER
  const onSubmit = async (values: TripFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 200));

    dispatch({ type: "SET_PARTICIPANTS", payload: values.participants });

    const tripPrice = trip.price || 0;
    const totalParticipants = values.participants;
    const totalPrice = tripPrice * totalParticipants;

    const payload = {
      userId: userId,
      itemId: itemId,
      type: "trip" as const,
      price: totalPrice,
      participants: values.participantDetails.map((p) => ({
        firstName: p.firstName,
        lastName: p.lastName,
        email: p.email,
        mobile: Number(p.phone),
      })),
    };

    // console.log("Payload to send:", payload);

    // Send to API
    bookTrip(payload, {
      onSuccess: () => {
        toast.success("Trip added to cart successfully!");
        setTripsBookings(true);
        // console.log("Trip booking successful!", res);
        setIsSaved(true);
      },
      onError: () => {
        toast.error("Failed to add trip to cart!");
        // console.error("Trip booking failed:", err);
      },
    });
  };


  // Calculate available spots based on the trip date
  const bookedForDate = (() => {
    // Helper to get YYYY-MM-DD
    const getDatePart = (dateStr?: string) => dateStr?.split("T")[0];
    const targetDate = getDatePart(trip.startDate);

    const match = trip.purchasedByDate?.find(
      (p) => getDatePart(p.tripDate) === targetDate,
    );
    if (match) return match.totalParticipants || 0;

    return 0;
  })();

  const capacity = trip.maximumCapacity || 50;
  const availableSlots = Math.max(0, capacity - bookedForDate);

  const participantOptions = Array.from(
    { length: availableSlots },
    (_, i) => i + 1,
  );

  if (tripsBookings) {
    const totalParticipants = form.getValues("participants");
    const tripPrice = trip.price || 0;
    const totalPrice = totalParticipants * tripPrice;

    return (
      <Card className="p-10 bg-white shadow-lg rounded-2xl text-center">
        <div className="flex flex-col items-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-800">
            Booking Added to Cart!
          </h2>

          {/* Trip Info */}
          <div className="text-gray-600 text-lg">
            <p className="font-semibold text-gray-800">{trip.title}</p>
            <p>
              <span className="font-semibold">{totalParticipants}</span> Diver
              {totalParticipants > 1 ? "s" : ""}
            </p>
            <p className="text-xl font-bold text-primary mt-2">
              Total: ${totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Divers Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {form.getValues("participantDetails").map((p, i) => (
                <div
                  key={i}
                  className="p-5 border border-gray-200 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-bold text-gray-800 mb-3 border-b pb-2">
                    Diver {i + 1}
                  </h4>

                  <div className="space-y-2 text-gray-700 text-sm">
                    <p>
                      <span className="font-semibold">First Name:</span>{" "}
                      {p.firstName || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Last Name:</span>{" "}
                      {p.lastName || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {p.email || "-"}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span>{" "}
                      {p.phone || "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Button */}
          <div className="flex justify-center gap-4">
            <Button
              className="mt-8 w-full bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/80"
              onClick={() => (window.location.href = "/trips")}
            >
              {/* Back Home */}
              Continue Shopping
            </Button>
            <Button
              className="mt-8 w-full bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/80"
              onClick={() => (window.location.href = "/cart")}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Your Information
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-6">
          {/* Participant count selector */}
          <FormField
            control={form.control}
            name="participants"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel className="text-lg font-semibold text-gray-700">
                  Number of Diver(s) *
                </FormLabel>
                <FormMessage />
                <FormControl>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(value) => {
                      const num = Number(value);
                      field.onChange(num);
                      dispatch({ type: "SET_PARTICIPANTS", payload: num });
                    }}
                  >
                    <SelectTrigger className="w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400 transition">
                      <SelectValue placeholder="Select participants" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg border border-gray-200 shadow-lg">
                      {participantOptions.map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Diver" : "Divers"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Dynamic participant forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow grid md:grid-cols-2 gap-6"
              >
                <h3 className="md:col-span-2 text-lg font-bold text-gray-800 mb-4 border-b pb-2">
                  Diver {index + 1}
                </h3>

                <FormField
                  control={form.control}
                  name={`participantDetails.${index}.firstName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`participantDetails.${index}.lastName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`participantDetails.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone *</FormLabel>
                      <FormControl>
                        <Input placeholder="xxxxxxxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`participantDetails.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="example@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
          </div>

          {/* Submit button */}
          <div className="md:col-span-2 mt-6">
            <Button
              type="submit"
              className={`w-full py-3 text-lg font-semibold transition ${isSaved
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/80 text-white"
                }`}
              disabled={isSaved || form.formState.isSubmitting}
            >
              {isSaved
                ? "Add to Cart"
                : form.formState.isSubmitting
                  ? "Saving..."
                  : "Add to Cart"}
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
