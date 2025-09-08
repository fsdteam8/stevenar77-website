"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// ✅ Zod validation schema
const createAccountSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    terms: z.boolean().refine((val) => val, "You must accept terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateAccountFormValues = z.infer<typeof createAccountSchema>;

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = (values: CreateAccountFormValues) => {
    console.log("Sign up values:", values);
    alert("Account created successfully!");
  };

  return (
    <div>
      {/* Right side - form */}
      <div className="flex items-center justify-center bg-white py-10 px-4">
        <div className="w-full max-w-lg">
          <h2 className="text-3xl md:text-[40px] font-playfair font-bold text-[#0694A2] mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-500 text-sm md:text-[16px] mb-6">
            Connect families with trusted care. Join ALH Hub today.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* First & Last Name */}
              <div className="flex flex-col md:flex-row gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel className="text-[16px] leading-[150%] font-medium text-[#343A40]">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name Here"
                          {...field}
                          className="h-12 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="md:w-1/2">
                      <FormLabel className="text-[16px] leading-[150%] font-medium text-[#343A40]">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name Here"
                          {...field}
                          className="h-12 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] leading-[150%] font-medium text-[#343A40]">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="hello@example.com"
                        {...field}
                        className="h-12 w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] leading-[150%] font-medium text-[#343A40]">
                      Create Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="********"
                          className="h-12 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[16px] leading-[150%] font-medium text-[#343A40]">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="********"
                          className="h-12 w-full"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Terms */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 cursor-pointer">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormLabel className="text-sm text-gray-600">
                      I agree to ALH Hub&apos;s{" "}
                      <a href="/terms" className="text-[#0694A2] underline">
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" className="text-[#0694A2] underline">
                        Privacy Policy
                      </a>
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-10 bg-[#0694A2] hover:bg-[#0694A2] cursor-pointer"
              >
                Sign Up
              </Button>
            </form>
          </Form>

          {/* Already have account */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#0694A2] font-medium hover:underline"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
