"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useProductDetails } from "@/services/hooks/product/useProductDetails";

const ProductDetails = () => {
  const params = useParams<{ id: string }>(); // ✅ grab /product/[id]
  const productId = params.id;

  const { data, isLoading, error } = useProductDetails(productId);
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Failed to load product.</p>;
  if (!data?.data) return <p>No product found.</p>;

  const product = data.data;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleBookNow = () => {
    console.log(`Booking ${quantity} of ${product.title}`);

    // ✅ Example redirect after booking
    router.push(`/checkout?productId=${product._id}&qty=${quantity}`);
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="mt-6 py-4">
      <div className="mx-auto container">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="rounded-lg aspect-square overflow-hidden shadow-md">
              <Image
                src={product.images[selectedImageIndex]?.url}
                alt={product.title}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <Button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
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
          </div>

          {/* Text Section */}
          <div className="order-2 space-y-8 lg:space-y-20 md:order-1">
            <h1 className="text-4xl md:text-4xl text-[#27303F] font-semibold mb-6">
              {product.title}
            </h1>
            <p className="flex gap-2 py-2">
              <Star className="text-yellow-400" /> {product.averageRating} (
              {product.totalReviews} reviews)
            </p>
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              {product.longDescription}
            </p>

            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="flex items-center">
                    <Button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-3 border border-gray-300 rounded-md hover:bg-gray-300  bg-transparent disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 cursor-pointer text-gray-600" />
                    </Button>

                    <span className="px-4 py-3 text-lg font-medium text-gray-900 text-center">
                      {quantity}
                    </span>

                    <Button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 cursor-pointer" />
                    </Button>
                  </div>

                  <div className="text-2xl font-bold text-gray-900">
                    $ {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="w-3/4">
                <div className="w-full mt-5">
                  <Button
                    onClick={handleBookNow}
                    className="min-w-full sm:w-auto flex items-center text-center cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-4 rounded-lg transition-colors text-lg"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
