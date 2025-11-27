// src/components/website/course/booking/PersonalInformation.tsx
"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

//  ZOD VALIDATION
const FormSchema = z.object({
  firstName: z.string().min(1, "This field is required"),
  lastName: z.string().min(1, "This field is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "This field is required"),
  age: z.coerce.number().min(1, "This field is required"),
  address: z.string().min(1, "This field is required"),
  city: z.string().min(1, "This field is required"),
  state: z.string().min(1, "This field is required"),
  postalCode: z.coerce.number().min(1, "This field is required"),
  gender: z.string().min(1, "This field is required"),
  shoeSize: z.coerce.number().min(1, "This field is required"),
  heightFeet: z.coerce.number().min(1, "This field is required"),
  heightInches: z.coerce.number().min(0, "This field is required"),
  weight: z.coerce.number().min(1, "This field is required"),
});

//  FIXED TYPE ERROR
type FormData = z.infer<typeof FormSchema>;

interface PersonalInformationProps {
  onNext: (data: FormData) => void;
  courseTitle: string;
}

export default function PersonalInformation({
  onNext,
  courseTitle,
}: PersonalInformationProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: FormData) => {
    onNext(data);
  };

  return (
    <div className="max-w-5xl mx-auto p-10 space-y-8 border rounded-2xl bg-white shadow-sm mt-8">
      <h2 className="text-3xl font-semibold text-center">
        <span className="text-primary">{courseTitle}</span> - Individual Booking
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6"
      >
        {/* FIRST NAME */}
        <div>
          <Label className="my-2">First Name *</Label>
          <Input {...register("firstName")} placeholder="First Name" />
          {errors.firstName && (
            <p className="text-red-600 text-sm my-2">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* LAST NAME */}
        <div>
          <Label className="my-2">Last Name *</Label>
          <Input {...register("lastName")} placeholder="Last Name" />
          {errors.lastName && (
            <p className="text-red-600 text-sm my-2">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <Label className="my-2">Email Address *</Label>
          <Input {...register("email")} placeholder="example@example.com" />
          {errors.email && (
            <p className="text-red-600 text-sm my-2">{errors.email.message}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <Label className="my-2">Phone Number *</Label>
          <Input {...register("phone")} placeholder="+1234567890" />
          {errors.phone && (
            <p className="text-red-600 text-sm my-2">{errors.phone.message}</p>
          )}
        </div>

        {/* AGE */}
        <div>
          <Label className="my-2">Age *</Label>
          <Input
            type="number"
            {...register("age")}
            placeholder="Enter your age"
          />
          {errors.age && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* GENDER */}
        <div>
          <Label className="my-2">Gender *</Label>
          <Select
            value={watch("gender")}
            onValueChange={(value) => setValue("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* ADDRESS */}
        <div className="col-span-2">
          <Label className="my-2">Address *</Label>
          <Input {...register("address")} placeholder="Street Address" />
          {errors.address && (
            <p className="text-red-600 text-sm my-2">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* CITY */}
        <div>
          <Label className="my-2">City *</Label>
          <Input {...register("city")} placeholder="City" />
          {errors.city && (
            <p className="text-red-600 text-sm my-2">{errors.city.message}</p>
          )}
        </div>

        {/* STATE */}
        <div>
          <Label className="my-2">State *</Label>
          <Input {...register("state")} placeholder="State" />
          {errors.state && (
            <p className="text-red-600 text-sm my-2">{errors.state.message}</p>
          )}
        </div>

        {/* POSTAL CODE */}
        <div>
          <Label className="my-2">Postal Code *</Label>
          <Input
            type="number"
            {...register("postalCode")}
            placeholder="Postal Code"
          />
          {errors.postalCode && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* SHOE SIZE */}
        <div>
          <Label className="my-2">Shoe Size *</Label>
          <Input
            type="number"
            {...register("shoeSize")}
            placeholder="e.g., 8"
          />
          {errors.shoeSize && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* HEIGHT FEET */}
        <div>
          <Label className="my-2">Height (Feet) *</Label>
          <Input {...register("heightFeet")} placeholder="Feet" />
          {errors.heightFeet && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* HEIGHT INCHES */}
        <div>
          <Label className="my-2">Height (Inches) *</Label>
          <Input {...register("heightInches")} placeholder="Inches" />
          {errors.heightInches && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* WEIGHT */}
        <div>
          <Label className="my-2">Weight *</Label>
          <Input {...register("weight")} placeholder="e.g., 50lbs" />
          {errors.weight && (
            <p className="text-red-600 text-sm my-2">This field is required</p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="col-span-2 flex justify-between mt-6">
          <Link href="/courses">
            <Button type="button" variant="outline" className="px-8">
              Back
            </Button>
          </Link>
          <Button type="submit" className="px-8">
            Add To Cart
          </Button>
        </div>
      </form>
    </div>
  );
}
