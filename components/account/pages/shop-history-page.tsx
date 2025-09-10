"use client";

import { useState } from "react";
import { ProductDetailModal } from "@/components/modals/product-detail-modal";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card";

const mockProducts = [
  {
    id: "1",
    title: "aLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "",
    participants: 0,
    price: 129,
    status: "complete" as const,
    imageUrl: "/diving-mask-yellow-coral-underwater.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "2",
    title: "aLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "",
    participants: 0,
    price: 129,
    status: "complete" as const,
    imageUrl: "/diving-mask-yellow-coral-underwater.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "3",
    title: "aLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "",
    participants: 0,
    price: 129,
    status: "complete" as const,
    imageUrl: "/diving-mask-yellow-coral-underwater.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
  {
    id: "4",
    title: "aLung Revelation 3X Mask",
    description:
      "Professional diving mask with triple lens design and anti-fog technology.",
    date: "Thursday, September 24",
    time: "09:00 AM",
    location: "",
    participants: 0,
    price: 129,
    status: "complete" as const,
    imageUrl: "/diving-mask-yellow-coral-underwater.jpg",
    contactDate: "Thursday, September 24",
    contactPhone: "+123456789",
  },
];

export function ShopHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof mockProducts)[0] | null
  >(null);

  const resultsPerPage = 5;
  const totalResults = 12;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const handleViewProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {mockProducts.map((product) => (
          <CourseCard
            key={product.id}
            {...product}
            onView={handleViewProduct}
          />
        ))}
      </div>

      <div className="mt-6 sm:mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
