"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ShopProductCard from "../shared/ShopProductCard";
import { useProducts } from "@/services/hooks/product/useProducts";
import { useRouter } from "next/navigation";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const { data: products = [], isLoading, isError, error } = useProducts();

  // Memoize filtered products for performance
  const filteredProducts = useMemo(
    () =>
      products.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [products, searchTerm]
  );

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">{(error as Error).message}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ShopProductCard
                key={product.id}
                image={product.previewUrl || "/images/default-product.jpg"}
                title={product.title}
                description={
                  product.description.replace(/<[^>]*>?/gm, "").slice(0, 100) + "..."
                }
                rating={0}
                reviews={0}
                price={product.price || 0}
                onSeeMore={() => router.push(`/shop/${product.id}`)}
                onBookNow={() => console.log("Add to cart:", product.id)}
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

export default Products;
