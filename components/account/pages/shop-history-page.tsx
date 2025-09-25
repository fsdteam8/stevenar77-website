"use client";

import { useState } from "react";
import { ProductDetailModal } from "@/components/modals/product-detail-modal";
import { ProductCreateModal } from "@/components/modals/ProductCreateModal";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card";
import { useMyOrders } from "@/services/hooks/orders/useMyOrders";
import { Button } from "@/components/ui/button";

const mapStatus = (status: string): "complete" | "pending" =>
  status === "completed" ? "complete" : "pending";

export function ShopHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false); // 👈 modal state

  const { data: ordersData, isLoading, isError } = useMyOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load orders</p>;

  // Transform API orders → product cards
  const products =
    ordersData?.data.map((order) => ({
      id: order._id,
      title: `Order #${order._id.slice(-6)}`,
      description: `Total: $${order.totalPrice} | Quantity: ${order.quantity}`,
      date: new Date(order.orderData).toDateString(),
      time: new Date(order.orderTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: "",
      participants: order.quantity,
      price: order.totalPrice,
      status: mapStatus(order.status),
      imageUrl: "/placeholder.svg",
      contactDate: new Date(order.orderData).toDateString(),
      contactPhone: "+123456789",
    })) || [];

  const resultsPerPage = 5;
  const totalResults = products.length; // ✅ fixed
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Shop Order History</h1>
          <p className="text-gray-600 mb-6">
            Review your past shop orders and their details below.
          </p>
        </div>
        <div>
          <Button
            className="mb-4 bg-primary hover:bg-teal-700 text-white"
            onClick={() => setIsCreateOpen(true)} // 👈 open modal
          >
            Add Product
          </Button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-3 sm:space-y-4">
        {paginatedProducts.map((product) => (
          <CourseCard
            key={product.id}
            {...product}
            onView={(id) => setSelectedProductId(id)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 sm:mt-8">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalResults={totalResults}
          resultsPerPage={resultsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Detail Modal */}
      <ProductDetailModal
        product={products.find((p) => p.id === selectedProductId) || null}
        isOpen={!!selectedProductId}
        onClose={() => setSelectedProductId(null)}
      />

      {/* Create Modal */}
      {/* <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      /> */}
    </div>
  );
}
