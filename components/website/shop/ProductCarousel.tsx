"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopProductCard from "../shared/ShopProductCard";
import { ShopProductCard as ShopProductCardType } from "@/types/shopProductCard";

// Dummy product data
const products: ShopProductCardType[] = [
  {
    image: "/images/product-1.jpg",
    title: "Organic Apple",
    description: "Fresh and juicy organic apples.",
    rating: 4.5,
    reviews: 24,
    price: 2.99,
    onSeeMore: () => alert("See more details for Organic Apple"),
    onBookNow: () => alert("Added Organic Apple to cart"),
  },
  {
    image: "/images/product-2.jpg",
    title: "Fresh Carrots",
    description: "Crunchy and sweet organic carrots.",
    rating: 4.7,
    reviews: 18,
    price: 1.99,
    onSeeMore: () => alert("See more details for Fresh Carrots"),
    onBookNow: () => alert("Added Fresh Carrots to cart"),
  },
  {
    image: "/images/product-4.jpg",
    title: "Almond Milk",
    description: "Healthy and tasty almond milk.",
    rating: 4.8,
    reviews: 32,
    price: 3.49,
    onSeeMore: () => alert("See more details for Almond Milk"),
    onBookNow: () => alert("Added Almond Milk to cart"),
  },
  {
    image: "/images/product-2.jpg",
    title: "Greek Yogurt",
    description: "Creamy and protein-rich Greek yogurt.",
    rating: 4.6,
    reviews: 28,
    price: 4.99,
    onSeeMore: () => alert("See more details for Greek Yogurt"),
    onBookNow: () => alert("Added Greek Yogurt to cart"),
  },
  {
    image: "/images/product-1.jpg",
    title: "Whole Grain Bread",
    description: "Nutritious whole grain bread.",
    rating: 4.4,
    reviews: 15,
    price: 3.99,
    onSeeMore: () => alert("See more details for Whole Grain Bread"),
    onBookNow: () => alert("Added Whole Grain Bread to cart"),
  },
  {
    image: "/images/product-2.jpg",
    title: "Organic Bananas",
    description: "Naturally ripened and sweet organic bananas.",
    rating: 4.9,
    reviews: 42,
    price: 1.49,
    onSeeMore: () => alert("See more details for Organic Bananas"),
    onBookNow: () => alert("Added Organic Bananas to cart"),
  },
  {
    image: "/images/product-1.jpg",
    title: "Quinoa Pack",
    description: "High-protein organic quinoa.",
    rating: 4.7,
    reviews: 19,
    price: 5.99,
    onSeeMore: () => alert("See more details for Quinoa Pack"),
    onBookNow: () => alert("Added Quinoa Pack to cart"),
  },
  {
    image: "/images/product-3.jpg",
    title: "Chia Seeds",
    description: "Nutritious organic chia seeds packed with Omega-3.",
    rating: 4.8,
    reviews: 30,
    price: 4.29,
    onSeeMore: () => alert("See more details for Chia Seeds"),
    onBookNow: () => alert("Added Chia Seeds to cart"),
  },
  {
    image: "/images/product-4.jpg",
    title: "Free-Range Eggs",
    description: "Farm-fresh free-range eggs from happy hens.",
    rating: 4.9,
    reviews: 35,
    price: 3.99,
    onSeeMore: () => alert("See more details for Free-Range Eggs"),
    onBookNow: () => alert("Added Free-Range Eggs to cart"),
  },
  {
    image: "/images/product-1.jpg",
    title: "Organic Spinach",
    description: "Tender and fresh organic spinach leaves.",
    rating: 4.6,
    reviews: 22,
    price: 2.49,
    onSeeMore: () => alert("See more details for Organic Spinach"),
    onBookNow: () => alert("Added Organic Spinach to cart"),
  },
  {
    image: "/images/product-2.jpg",
    title: "Avocado",
    description: "Creamy and ripe organic avocados.",
    rating: 4.8,
    reviews: 27,
    price: 1.79,
    onSeeMore: () => alert("See more details for Avocado"),
    onBookNow: () => alert("Added Avocado to cart"),
  },
  {
    image: "/images/product-3.jpg",
    title: "Oatmeal Cookies",
    description: "Delicious and healthy homemade oatmeal cookies.",
    rating: 4.5,
    reviews: 16,
    price: 3.59,
    onSeeMore: () => alert("See more details for Oatmeal Cookies"),
    onBookNow: () => alert("Added Oatmeal Cookies to cart"),
  },
  {
    image: "/images/product-1.jpg",
    title: "Kale Chips",
    description: "Crunchy and flavorful baked kale chips.",
    rating: 4.3,
    reviews: 14,
    price: 2.99,
    onSeeMore: () => alert("See more details for Kale Chips"),
    onBookNow: () => alert("Added Kale Chips to cart"),
  },
];

const ProductCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);

    return () => {
      api?.off("select", handleSelect);
    };
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="py-10 space-y-8 lg:space-y-20">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-montserrat font-semibold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-gray-600 mx-auto leading-relaxed px-4">
          Explore our top-quality products loved by our customers.
        </p>
      </div>

      <Carousel 
        setApi={setApi} 
        className="w-full container mx-auto px-4 sm:px-6 lg:px-8"
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product, index) => (
            <CarouselItem
              key={`${product.title}-${index}`}
              className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <ShopProductCard {...product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Bottom Controls */}
      <div className="flex items-center justify-center gap-4 mt-6 px-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollPrev}
          className="shrink-0"
          disabled={current === 1}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>

        <div className="flex gap-1 sm:gap-2 overflow-x-auto max-w-xs">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full shrink-0 transition-colors ${
                i === current - 1 ? "bg-teal-600" : "bg-gray-300"
              }`}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <Button 
          variant="outline" 
          size="icon" 
          onClick={scrollNext}
          className="shrink-0"
          disabled={current === count}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
      </div>
    </section>
  );
};

export default ProductCarousel;