"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ShopProductCard from "../shared/ShopProductCard";
import { useProducts } from "@/services/hooks/product/useProducts";
import { useRouter } from "next/navigation";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error } = useProducts();
    const router = useRouter();

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">{error.message}</p>;

  const products = data?.data.products || [];
  const meta = data?.data.meta;

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <div className="flex flex-col justify-between w-full sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-65">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map((product) => (
            <ShopProductCard
              key={product._id}
              image={product.images?.[0]?.url || "/images/default-product.jpg"}
              title={product.title}
              description={product.shortDescription}
              rating={product.averageRating}
              reviews={product.totalReviews}
              price={product.price}
              onSeeMore={() => router.push(`/shop/${product._id}`)}
              onBookNow={() => console.log("Add to cart:", product._id)}
            />
          ))}
        </div>

        {/* Pagination */}
        {meta && (
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 mb-4">
              Showing page {meta.page} of {meta.totalPages} ({meta.totalProducts} products)
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  />
                </PaginationItem>
                {[...Array(meta.totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setCurrentPage(Math.min(meta.totalPages, currentPage + 1))
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
