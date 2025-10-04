"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { useCreateOrder } from "@/services/hooks/order/useCreateOrder";
import { ProductCreateModal } from "@/components/modals/ProductCreateModal";
import { useGelatoSingleProducts } from "@/services/hooks/product/useGelatoProducts";
import { Skeleton } from "@/components/ui/skeleton";

const GelatoDetails = () => {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const router = useRouter();

  const {
    data: product,
    isLoading,
    error,
  } = useGelatoSingleProducts(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { mutate: createOrder, isPending } = useCreateOrder();

  if (isLoading) {
    <div className="flex items-center space-x-4 text-center bg-gray-50 py-10">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>;
  }
  if (error)
    return (
      <p className="text-center text-red-500 py-10">Failed to load product.</p>
    );
  if (!product) return <p className="text-center py-10">No product found.</p>;

  // ✅ Fallback images
  const images = product.images?.length
    ? product.images
    : [{ url: product.previewUrl || "/images/default-product.jpg" }];

  const safeImageIndex = Math.min(selectedImageIndex, images.length - 1);
  const imageSrc = images[safeImageIndex].url;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleBookNow = () => setIsCreateOpen(true);

  return (
    <div className="mt-6 py-4">
      <div className="mx-auto container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image Section */}
          <div className="space-y-4 ">
            <div className="rounded-lg aspect-square overflow-hidden shadow-md">
              <Image
                src={imageSrc}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <Button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                      selectedImageIndex === index
                        ? "ring-2 ring-teal-600 ring-offset-2 opacity-100"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20"
                    />
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Text Section */}
          <div className="order-2 space-y-8 lg:space-y-20 md:order-1">
            <h1 className="text-4xl text-[#27303F] font-semibold mb-6">
              {product.title}
            </h1>
            <p className="flex gap-2 py-2">
              <Star className="text-yellow-400" /> 0 (0 reviews)
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {product.description?.replace(/<[^>]+>/g, "") ||
                "No description available."}
            </p>

            <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Quantity Controls */}
                <div className="flex items-center">
                  {/* <Button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-3 border border-gray-300 rounded-md hover:bg-gray-300 bg-transparent disabled:cursor-not-allowed"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </Button> */}

                  {/* <span className="px-4 py-3 text-lg font-medium text-gray-900 text-center">
                    {quantity}
                  </span> */}

                  {/* <Button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                  </Button> */}
                </div>

                {/* Dynamic Price */}
                <div className="text-2xl font-bold flex items-center text-gray-900">
                  <div className="pt-2">
                    <Image
                      src={`/images/gelato.svg`}
                      alt="gelato"
                      width={70}
                      height={70}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={handleBookNow}
              disabled={isPending}
              className="mt-4 sm:mt-0 min-w-full sm:w-auto flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-4 rounded-lg transition-colors text-lg"
            >
              {isPending ? "Loading..." : "Draft Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        productId={product.id}
      />
    </div>
  );
};

export default GelatoDetails;
