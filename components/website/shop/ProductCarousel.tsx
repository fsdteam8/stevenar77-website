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
import { useAllProducts } from "@/services/hooks/product/useAllProducts";
import { useRouter } from "next/navigation";

const ProductCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const router = useRouter();

  const { products, isLoading, isError } = useAllProducts();

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };

    api.on("select", handleSelect);
    return () => {
      api?.off("select", handleSelect);
    };
  }, [api, products]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  if (isLoading) {
    return <p className="text-center py-10">Loading featured products...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-10">
        Failed to load products.
      </p>
    );
  }

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
        opts={{ align: "start", loop: false }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
  {products
    .filter((product) => product._id) // ✅ Only admin products have _id
    .map((product) => (
      <CarouselItem
        key={product._id}
        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
      >
        <div className="h-[450px] sm:h-[500px] lg:h-[550px] flex flex-col">
          <ShopProductCard
            image={product.previewUrl || "/images/default-product.jpg"}
            title={product.title}
            description={
              product.shortDescription
                ? product.shortDescription.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."
                : ""
            }
            rating={product?.averageRating || 0}
            reviews={product?.totalReviews || 0}
            price={product.price || 0}
            onSeeMore={() => router.push(`/shop/${product._id}`)}
            onBookNow={() =>
              router.push(`/checkout?productId=${product._id}&qty=1`)
            }
          />
        </div>
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
