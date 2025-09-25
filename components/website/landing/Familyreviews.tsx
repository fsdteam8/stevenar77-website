"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReviewCard } from "../shared/reviewcard";
import { Review } from "@/types/review";
import { type EmblaCarouselType } from "embla-carousel";

// Example dummy data (replace with API response in real use)
const reviews: Review[] = [
  {
    _id: "1",
    userId: { _id: "u1", firstName: "Alice", lastName: "Johnson", email: "alice@example.com" },
    facility: { _id: "f1", name: "Wellness Center", address: "123 Main St" },
    star: 5,
    comment: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "2",
    userId: { _id: "u2", firstName: "Bob", lastName: "Smith", email: "bob@example.com" },
    facility: { _id: "f2", name: "Fitness Hub", address: "456 Elm Ave" },
    star: 4,
    comment: "I've been ordering from TABLEFRESH for over year now, and the quality of their organic produce is consistently excellent. The convenience of having fresh, organic food delivered to my door has made healthy eating so much easier for my family.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "3",
    userId: { _id: "u3", firstName: "Charlie", lastName: "Brown", email: "charlie@example.com" },
    facility: { _id: "f3", name: "Healthy Eats Cafe", address: "789 Oak Blvd" },
    star: 5,
    comment: "TABLEFRESH never disappoints! The produce is fresh and tastes amazing. Delivery is always on time. Highly recommend for anyone wanting quality organic food.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "4",
    userId: { _id: "u4", firstName: "Dana", lastName: "White", email: "dana@example.com" },
    facility: { _id: "f1", name: "Wellness Center", address: "123 Main St" },
    star: 4,
    comment: "Great service and quality products. I love that I can trust TABLEFRESH for clean, organic ingredients every week.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "5",
    userId: { _id: "u5", firstName: "Evan", lastName: "Taylor", email: "evan@example.com" },
    facility: { _id: "f4", name: "Green Market", address: "101 Pine St" },
    star: 3,
    comment: "Good selection of organic produce, though sometimes the delivery times can be a bit late. Overall satisfied.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "6",
    userId: { _id: "u6", firstName: "Fiona", lastName: "Green", email: "fiona@example.com" },
    facility: { _id: "f2", name: "Fitness Hub", address: "456 Elm Ave" },
    star: 5,
    comment: "Absolutely love TABLEFRESH! Their produce is fresh, flavorful, and the customer service is excellent.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "7",
    userId: { _id: "u7", firstName: "George", lastName: "King", email: "george@example.com" },
    facility: { _id: "f5", name: "Organic Oasis", address: "202 Maple Rd" },
    star: 4,
    comment: "Reliable delivery and fresh items every time. It's my go-to for organic groceries.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "8",
    userId: { _id: "u8", firstName: "Hannah", lastName: "Lee", email: "hannah@example.com" },
    facility: { _id: "f3", name: "Healthy Eats Cafe", address: "789 Oak Blvd" },
    star: 5,
    comment: "The convenience and quality are unmatched. I feel good knowing my family is eating clean with TABLEFRESH.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "9",
    userId: { _id: "u9", firstName: "Ian", lastName: "Moore", email: "ian@example.com" },
    facility: { _id: "f4", name: "Green Market", address: "101 Pine St" },
    star: 3,
    comment: "Overall good, but I wish they had a wider variety of produce during the winter months.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  {
    _id: "10",
    userId: { _id: "u10", firstName: "Julia", lastName: "Scott", email: "julia@example.com" },
    facility: { _id: "f5", name: "Organic Oasis", address: "202 Maple Rd" },
    star: 5,
    comment: "Fresh, tasty, and healthy. TABLEFRESH is my favorite place to get organic produce delivered.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0,
  },
  
];

const Familyreviews = () => {
  const [api, setApi] = React.useState<EmblaCarouselType | null>(null);
  const [current, setCurrent] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  const handleSetApi = React.useCallback((emblaApi: EmblaCarouselType | undefined) => {
    setApi(emblaApi || null);
  }, []);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());

    // set initial values
    setSnapCount(api.scrollSnapList().length);
    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="py-10 space-y-8 lg:space-y-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-montserrat font-semibold text-gray-900 mb-4">
          Scuba Stevenar 
        </h2>
        <p className="text-gray-600 mx-auto leading-relaxed px-4">
          Hear from our happy customers about their experiences with our scuba diving courses and adventures.
        </p>
      </div>

      <Carousel setApi={handleSetApi} className="w-full container mx-auto px-4 sm:px-6 lg:px-8">
        <CarouselContent className="-ml-2 md:-ml-4">
          {reviews.map((review) => (
            <CarouselItem key={review._id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
              <ReviewCard review={review} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 px-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => api?.scrollPrev()}
          className="shrink-0"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        {/* Dots */}
        <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-xs">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full shrink-0 transition-colors ${
                i === current ? "bg-teal-600" : "bg-gray-300"
              }`}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => api?.scrollNext()}
          className="shrink-0"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </section>
  );
};

export default Familyreviews;