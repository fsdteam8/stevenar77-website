
import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/website/shared/navbar";
import Footer from "@/components/website/shared/footer";
import TopHeader from "@/components/website/shared/TopHeader";
import MessagButton from "@/components/website/shared/MessagButton";
import { BookingProvider } from "@/components/website/course/booking-context";

export const metadata: Metadata = {
  title: "Dive Into Adventure",
  description: "From beginner to pro, we guide your underwater adventure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopHeader />
      <Navbar /> 
      <BookingProvider>


      {children} 
      </BookingProvider>
      <Footer />
      <MessagButton />
    </>
  );
}
