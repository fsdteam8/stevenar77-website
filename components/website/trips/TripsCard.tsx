import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface TripsCardProps {
  image: string;
  title: string;
  shortDescription: string;
  seeMoreLink: string;
  bookNowLink: string;
  reverse?: boolean; // optional, default = false
}

export default function TripsCard({
  image,
  title,
  shortDescription,
  seeMoreLink,
  bookNowLink,
  reverse = false,
}: TripsCardProps) {
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleBookNow = () => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", bookNowLink);
      setShowLoginModal(true);
    } else {
      router.push(bookNowLink);
    }
  };

  return (
    <div className="container mx-auto my-16 md:my-32">
      <div
        className={`grid grid-cols-1 md:grid-cols-12 items-center gap-6 ${
          reverse ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Image */}
        <div className="md:col-span-5 flex justify-center">
          <Image
            src={image}
            alt={title}
            width={730}
            height={600}
            className="rounded-md object-cover w-full h-auto"
          />
        </div>

        {/* Content */}
        <div
          className={`md:col-span-7 p-4 ${reverse ? "md:[direction:ltr]" : ""}`}
        >
          {/* Title */}
          <h1 className="text-[#27303F] text-2xl font-semibold">{title}</h1>

          {/* Short Description */}
          <p
            className="text-[#68706A] text-base font-medium my-3 italic leading-relaxed"
            dangerouslySetInnerHTML={{ __html: shortDescription }}
          >
            {/* {shortDescription} */}
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link href={seeMoreLink}>
              <Button className="border border-[#0694A2] text-gray-800 px-12 py-2 md:px-20 rounded-md hover:bg-gray-200 bg-transparent  transition cursor-pointer">
                See More
              </Button>
            </Link>

            <Button
              onClick={handleBookNow}
              className="bg-[#0694A2] text-white px-12 py-2 md:px-20 rounded-md hover:bg-[#057c88] transition cursor-pointer"
            >
              Buy Now
            </Button>
          </div>
        </div>

        {/* ✅ Login Required Modal */}
        <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
          <DialogContent className="!max-w-xl">
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
              <DialogDescription>
                You need to be logged in to book this trip. Please login to
                continue.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowLoginModal(false);
                  router.push("/login");
                }}
              >
                Login Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
