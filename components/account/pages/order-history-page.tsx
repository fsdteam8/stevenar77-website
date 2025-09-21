"use client";

import { useState } from "react";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card"; // reuse this for display
import { useMyOrders } from "@/services/hooks/orders/useMyOrders";

const mapStatus = (status: string): "complete" | "pending" =>
  status === "completed" ? "complete" : "pending";

const OrderHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data: ordersData, isLoading, isError } = useMyOrders();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="text-red-500">Failed to load orders</p>;

  // Transform API response to displayable products
  const products =
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
    ordersData?.data.map((order: any) => ({
      id: order._id,
      title: order.productId?.title || "Product",
      description: `Total: $${order.totalPrice} | Quantity: ${order.quantity}`,
      date: new Date(order.orderData).toDateString(),
      time: new Date(order.orderTime).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      location: "", // <-- required for CourseCard
      participants: order.quantity,
      price: order.totalPrice,
      status: mapStatus(order.status),
      imageUrl:
        order.images?.[0]?.url ||
        order.productId?.images?.[0]?.url ||
        "/placeholder.svg",
      contactDate: new Date(order.orderData).toDateString(),
      contactPhone: "+123456789",
    })) || [];

  const resultsPerPage = 5;
  const totalResults = products.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  const paginatedProducts = products.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  return (
    <div className="container mx-auto px-2 sm:px-0">
      <div className="flex flex-col mb-6">
        <h1 className="text-2xl font-semibold mb-4">Order History</h1>
        <p className="text-gray-600 mb-6">
          Review your past orders and their details below.
        </p>
      </div>

      {/* Orders List */}
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
    </div>
  );
};

export default OrderHistoryPage;
