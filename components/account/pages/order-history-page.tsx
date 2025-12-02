"use client";

import { useState } from "react";
import { Pagination } from "../pagination";
import { CourseCard } from "../course-card"; // reuse this for display
import { useMyOrders } from "@/services/hooks/orders/useMyOrders";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonCard() {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-xl shadow animate-pulse">
      {/* Image */}
      <Skeleton className="w-28 h-28 rounded-lg" />

      {/* Content */}
      <div className="flex-1 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />

        <div className="flex gap-3 mt-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

const mapStatus = (
  paymentStatus: string | undefined,
): "complete" | "pending" =>
  paymentStatus === "successful" || paymentStatus === "completed"
    ? "complete"
    : "pending";

const OrderHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [, setSelectedProductId] = useState<string | null>(null);

  const { data: ordersData, isLoading, isError } = useMyOrders();
  // ---------------------
  // Loading Skeleton
  // ---------------------
  if (isLoading) {
    return (
      <div className="container mx-auto px-2 sm:px-0 space-y-4 mt-4">
        {[...Array(5)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) return <p className="text-red-500">Failed to load orders</p>;

  // Transform API response -> displayable product items (flattened from cartsIds)
  const products =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ordersData?.data ?? []).flatMap((order: any) => {
      // order: { _id, cartsIds: [...], paymentStatus, createdAt, ... }
      const orderCreated = order?.createdAt
        ? new Date(order.createdAt)
        : undefined;
      const common = {
        orderId: order?._id ?? null,
        paymentStatus: order?.paymentStatus ?? undefined,
        orderCreated,
      };

      // Only keep cart items that are products (you said modal will only have products)
      return (
        (order?.cartsIds ?? [])
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          .filter((ci: any) => ci?.type === "product")
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((ci: any) => {
            const item = ci?.item ?? {};
            const quantity = Number(ci?.quantity ?? 1);
            const unitPrice = Number(item?.price ?? 0);
            const totalPrice = unitPrice * Math.max(1, quantity);

            // pick an image: prefer item.image (string), otherwise fallback to first string in ci.images
            let imageUrl = "/placeholder.svg";
            if (typeof item?.image === "string" && item.image)
              imageUrl = item.image;
            else if (Array.isArray(ci?.images) && ci.images.length > 0) {
              const first = ci.images[0];
              imageUrl =
                typeof first === "string" ? first : (first?.url ?? imageUrl);
            }

            return {
              id: ci?._id ?? `${order?._id}-${item?.title ?? "item"}`,
              title: item?.title ?? "Product",
              description: `Unit: $${unitPrice.toLocaleString()} • Quantity: ${quantity} • Total: $${totalPrice.toLocaleString()}`,
              date: orderCreated ? orderCreated.toDateString() : "",
              time: orderCreated
                ? orderCreated.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "",
              location: "",
              participants: quantity,
              price: totalPrice,
              status: mapStatus(order?.paymentStatus),
              imageUrl,
              contactDate: orderCreated ? orderCreated.toDateString() : "",
              contactPhone:
                order?.userId?.phone ?? order?.userId?.email ?? "+000000000",
              // optional: keep references for detail view
              rawOrder: order,
              rawCartItem: ci,
              ...common,
            };
          })
      );
    }) || [];

  const resultsPerPage = 5;
  const totalResults = products.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / resultsPerPage));

  const paginatedProducts = products.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage,
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
        {paginatedProducts.length === 0 ? (
          <p className="text-gray-500">No product orders found.</p>
        ) : (
          paginatedProducts.map((product) => (
            <CourseCard
              key={product.id}
              {...product}
              onView={(id) => setSelectedProductId(id)}
            />
          ))
        )}
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
