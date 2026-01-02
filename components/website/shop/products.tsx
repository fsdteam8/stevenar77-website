"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ShopProductCard from "../shared/ShopProductCard";
import {
  useAdminProducts,
  AdminProduct,
} from "@/services/hooks/product/useAdminProducts";
import { Skeleton } from "@/components/ui/skeleton";

const Products = () => {
  const [searchTerm] = useState("");
  const router = useRouter();

  const { data: products = [], isLoading, isError, error } = useAdminProducts(); // admin only

  const filteredProducts = useMemo(
    () =>
      products.filter((p: AdminProduct) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [products, searchTerm],
  );

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
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">
        {(error as Error).message}
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="container mx-auto">
        {/* Optional Search */}
        {/* <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full max-w-xs mb-6"
        /> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: AdminProduct) => (
              <ShopProductCard
                key={product._id}
                image={
                  product.images?.[0]?.url || "/images/default-product.jpg"
                }
                id={product._id}
                title={product.title}
                description={
                  product.shortDescription
                    ? product.shortDescription.slice(0, 100) + "..."
                    : product.longDescription
                      ? product.longDescription.slice(0, 100) + "..."
                      : ""
                }
                // rating={product.averageRating || 0}
                // reviews={product.totalReviews || 0}
                price={product.price || 0}
                onSeeMore={() => router.push(`/shop/${product._id}`)} // admin product page
                onBookNow={() => console.log("Add to cart:", product._id)}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-10">
              No admin products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
