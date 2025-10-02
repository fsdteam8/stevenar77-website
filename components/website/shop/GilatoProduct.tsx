"use client";

import React from "react";
import { GelatoProduct, useGelatoProducts } from "@/services/hooks/product/useGelatoProducts";

import { useRouter } from "next/navigation";
import ShopProductCard from "../shared/ShopProductCard";
import GelatoShopProductCard from "../shared/GelatoShopProductCard";


const GilatoProduct = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGelatoProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="container mx-auto mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
        {data && data.length > 0 ? (
          data.map((product: GelatoProduct) => (
            <GelatoShopProductCard
              key={product.id}
              image={product.previewUrl || "/images/default-product.jpg"}
              title={product.title}
              description={
                product.description
                  ? product.description.replace(/<[^>]+>/g, "").slice(0, 100) + "..."
                  : ""
              }
              rating={0} // API doesn't provide rating yet
              reviews={0} // same here
              price={0}   // same here, maybe add later from variants
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
  );
};

export default GilatoProduct;
