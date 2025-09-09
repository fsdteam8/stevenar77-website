"use client";

import { useState } from "react";

import { ProductDetailModal } from "@/components/modals/product-detail-modal";
import { CourseCard } from "../course-card";
import { Pagination } from "../pagination";

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
    <div className="container mx-auto">
      <div className="space-y-6">
        {mockProducts.map((product) => (
          <CourseCard
            key={product.id}
            {...product}
            onView={handleViewProduct}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalResults={totalResults}
        resultsPerPage={resultsPerPage}
        onPageChange={setCurrentPage}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
