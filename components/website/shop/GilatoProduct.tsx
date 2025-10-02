"use client";

import React from "react";
import {
  GelatoProduct,
  useGelatoProducts,
} from "@/services/hooks/product/useGelatoProducts";

import { useRouter } from "next/navigation";
import ShopProductCard from "../shared/ShopProductCard";
import GelatoShopProductCard from "../shared/GelatoShopProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const GilatoProduct = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGelatoProducts();

  if (isLoading)
    return (
      <div className="container mx-auto space-y-6">
        <Skeleton className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    );
  if (error) return <p>Failed to load products.</p>;

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto pt-10 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
          {data && data.length > 0 ? (
            data.map((product: GelatoProduct) => (
              <GelatoShopProductCard
                key={product.id}
                image={product.previewUrl || "/images/default-product.jpg"}
                title={product.title}
                description={
                  product.description
                    ? product.description
                        .replace(/<[^>]+>/g, "")
                        .slice(0, 100) + "..."
                    : ""
                }
                rating={0} // API doesn't provide rating yet
                reviews={0} // same here
                price={0} // same here, maybe add later from variants
                onSeeMore={() => router.push(`/shop/gelato/${product.id}`)}
                onBookNow={() => console.log("Add to cart:", product.id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No admin products found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GilatoProduct;
