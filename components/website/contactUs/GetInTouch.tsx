"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useContact } from "@/services/hooks/contact/useContact";

const formSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  message: z.string().min(1, "Message is required"),
 
});

export default function GetInTouch() {
  const contactMutation = useContact();
  const [loading,setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
  const {  ...payload } = values; // exclude "agree" before sending

  setLoading(true); 

  contactMutation.mutate(payload, {
    onSuccess: (res) => {
      toast.success(res.message || "Message sent successfully!");
      form.reset();
      setLoading(false); // stop loading
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong. Please try again.");
      setLoading(false); // stop loading
    },
  });
}

  return (
    <div className="bg-[#FFFEFD] py-2 md:py-32">
      <div className="container mx-auto bg-[#FFF] rounded-2xl shadow-sm grid grid-cols-1 md:grid-cols-2">
        {/* Left side: Form */}
        <div className="p-10 order-1 md:order-1">
          <h2
            className="text-2xl md:text-4xl font-bold text-[#343A40]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Contact Us
          </h2>
          <p className="text-[#6C757D] text-sm pt-2 md:text-base mb-6">
            We might be diving, but we&apos;ll surface soon and get back to you!
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="First Name"
                          {...field}
                          className="py-5 rounded-sm"
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
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Last Name"
                          {...field}
                          className="py-5 rounded-sm"
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="hello@example.com"
                        {...field}
                        className="py-5 rounded-sm"
                      />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1234567890"
                        {...field}
                        className="py-5 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message here..."
                        {...field}
                        className="h-[150px] rounded-sm align-top"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Agree Checkbox */}
            

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-[#0694A2] cursor-pointer rounded-sm"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Form>
        </div>

        {/* Right side: Image */}
        <div className="relative h-64 md:h-auto order-2 md:order-2">
          <Image
            src="/images/contact.png"
            alt="This is Contact Image"
            fill
            className="object-cover md:rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
