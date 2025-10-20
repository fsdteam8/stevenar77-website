"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTripBooking } from "../course/steps/TripBookingContext";

// ✅ Validation schema (generic phone, not US only)
const tripSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(6, "Phone must be at least 6 digits")
    .max(15, "Phone must be at most 15 digits"),
  email: z.string().email("Invalid email"),
});

type TripFormValues = z.infer<typeof tripSchema>;

export function TripForm() {
  const { state, dispatch } = useTripBooking();
  const [isSaved, setIsSaved] = useState(false); // ✅ track if form is saved

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      firstName: state.personalInfo.name.split(" ")[0] || "",
      lastName: state.personalInfo.name.split(" ")[1] || "",
      phone: state.personalInfo.phone || "",
      email: state.personalInfo.email || "",
    },
  });

  const onSubmit = async (values: TripFormValues) => {
    // Simulate async operation (optional)
    await new Promise((resolve) => setTimeout(resolve, 200));

    dispatch({
      type: "SET_PERSONAL_INFO",
      payload: {
        name: `${values.firstName} ${values.lastName}`,
        phone: values.phone,
        email: values.email,
      },
    });

    setIsSaved(true); // ✅ mark as saved permanently
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-[#343a40]">
        Your Information
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button full width */}
          <div className="md:col-span-2 mt-4">
            <Button
              type="submit"
              className={`w-full ${isSaved ? "bg-gray-400 cursor-no-drop" : ""}`}
              disabled={isSaved || form.formState.isSubmitting}
            >
              {isSaved
                ? "Saved"
                : form.formState.isSubmitting
                ? "Saving..."
                : "Save & Continue"}
            </Button>
          </div>
        </form>
      </Form>

      <p className="text-xs text-[#6c757d] mt-4">
        * Required fields - All information must be completed before proceeding
        to payment.
      </p>
    </Card>
  );
}
