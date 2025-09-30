"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/images/white-logo.png";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { Mail, MapPin, Phone } from "lucide-react"; // ✅ import hook
import { useCourses } from "@/services/hooks/courses/useCourses";
import { useSocial } from "@/services/hooks/social/social";

const Footer = () => {
  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/courses", text: "Courses" },
    { href: "/trips", text: "Trips" },
    { href: "/shop", text: "Shop" },
    { href: "/about-us", text: "About us" },
    { href: "/contact-us", text: "Contact Us" },
  ];

  // ✅ Fetch courses
  const { data: courses, isLoading, error } = useCourses();
  const { data } = useSocial();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading social data</p>;
  return (
    <footer className="bg-[#010D13] text-white py-4 lg:py-5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 ">
            <div className=" flex items-center gap-3">
              <Image
                src={logo}
                alt=" logo"
                width={64}
                height={64}
                className="mb-4"
              />
              <div className="flex gap-4 px-3">
                <p className="font-bold text-base text-white">The Ocean.</p>
                <p className="font-bold text-base text-white">The Adventure.</p>
                <p className="font-bold text-base text-white">The Life.</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm  text-center mx-auto lg:mx-0 lg:text-start text-white max-w-xs">
                The Premier Choice for Diving Eduction in Los Angeles & Ventura
                Counties.
              </p>
              <div className="socails flex mt-4 gap-2">
                <Link href={`${data?.data[0]?.facebook}`} target="_blank">
                  <FaFacebookSquare className="text-4xl  text-white duration-700 hover:text-blue-600" />
                </Link>
                <div className="relative group">
                  <Link href={`${data?.data[0]?.instagram}`} target="_blank">
                    <FaInstagramSquare className="text-4xl duration-700  text-white" />
                  </Link>
                  <div className="absolute hidden  group-hover:block h-[90%] w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition text-white duration-700 bg-gradient-to-r from-[#fa7e1e] via-[#d62976] to-[#4f5bd5] rounded-xs mix-blend-overlay" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-white capitalize hover:text-primary transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses (Dynamic) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Courses</h3>
            <ul className="space-y-2">
              {isLoading && <li className="text-sm">Loading...</li>}
              {error && (
                <li className="text-sm text-red-400">Failed to load</li>
              )}
              {courses &&
                courses.slice(0, 5).map((course) => (
                  <li key={course._id}>
                    <Link
                      href={`/courses/${course._id}`}
                      className="text-sm text-white hover:text-primary transition-colors"
                    >
                      {course.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Information</h3>
            <ul className="space-y-2 text-sm text-white">
              <li className="flex gap-2 items-center">
                <Mail size={15} />
                <a
                  href="mailto:scubastevenar@gmail.com"
                  className="hover:underline"
                >
                  {data?.data[0]?.email}
                </a>
              </li>
              <li className="flex gap-2 items-center">
                <Phone size={15} />{" "}
                {data?.data[0].PhoneNumber
                  ? data?.data[0].PhoneNumber
                  : "714-728-2300"}
              </li>
              <li className="flex gap-2 items-center">
                <MapPin size={15} /> {data?.data[0]?.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-5 pt-5 border-t border-primary/20">
          <p className="text-center text-sm pb-0 text-white">
            © 2025 Scuba Life. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
