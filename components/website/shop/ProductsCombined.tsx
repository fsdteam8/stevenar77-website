"use client";

import React from "react";
import ShopProductCard from "../shared/ShopProductCard";
import { useAllProducts } from "@/services/hooks/product/useAllProducts";
import { useRouter } from "next/navigation";

const ProductsCombined = () => {
  const router = useRouter();
  const { products, isLoading, isError } = useAllProducts();

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load products.</p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <ShopProductCard
                key={product._id}
                image={product.previewUrl || "/images/default-product.jpg"}
                title={product.title}
                id={product._id}
                description={
                  product.shortDescription
                    ? product.shortDescription
                        .replace(/<[^>]*>?/gm, "")
                        .slice(0, 100) + "..."
                    : ""
                }
                // rating={0}
                // reviews={0}
                price={product.price || 0}
                onSeeMore={() => router.push(`/shop/${product._id}`)}
                onBookNow={() => console.log("Buy now clicked:", product._id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsCombined;
