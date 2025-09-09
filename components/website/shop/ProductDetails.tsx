"use client";
import { Minus, Plus, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const price = 450;

  // Image data with paths and alt text
  const images = [
    { src: "/images/rescue-image.png", alt: "Rescue Diver training main view" },
    { src: "/images/product-1.jpg", alt: "Rescue Diver training side view" },
    { src: "/images/product-2.jpg", alt: "Rescue Diver training detail view" },
    { src: "/images/product-3.jpg", alt: "Rescue Diver training equipment" },
    { src: "/images/product-4.jpg", alt: "Rescue Diver training underwater" }
  ];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleBookNow = () => {
    // Add your booking logic here
    console.log(`Booking ${quantity} Rescue Diver course(s)`);
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
            {/* Main Image */}
            <div className="rounded-lg aspect-square overflow-hidden shadow-md">
              <Image
                src={images[selectedImageIndex].src}
                alt={images[selectedImageIndex].alt}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 ${
                    selectedImageIndex === index
                      ? "ring-2 ring-teal-600 ring-offset-2 opacity-100"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={80}
                    height={80}
                    className="object-cover w-20 h-20"
                  />
                </button>
              ))}
            </div>
          </div>

          
          {/* Text Section */}
          <div className="order-2 space-y-8 lg:space-y-20 md:order-1">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl text-[#27303F] font-semibold  mb-6">
              AquaLung Revelation 3X Mask
            </h1>
            <p className="flex gap-2 py-2">
                <Star className="text-yellow-400" />    4.8 (32 reviews)
            </p>
            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-lg mb-8">
              Sunny Hills Assisted Living offers a warm and welcoming environment for seniors, providing personalized care, comfortable accommodations, and a variety of daily activities. With 24/7 professional support, nutritious meals, and engaging social programs, residents enjoy both independence and peace of mind. Located in a serene neighborhood, Sunny Hills ensures a safe, supportive, and friendly community for your loved ones.
            </p>

            

            {/* Booking Section */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                {/* Quantity and Price */}
                <div className="flex items-center gap-6">
                  {/* Quantity Selector */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 cursor-pointer  text-gray-600" />
                    </button>

                    <span className="px-4 py-3 text-lg font-medium text-gray-900  text-center">
                      {quantity}
                    </span>

                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="p-3 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700 transition-colors rounded-md"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-4 h-4 cursor-pointer" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-bold text-gray-900">
                    $ {price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className=" w-full mt-5">
                {/* Book Now Button */}
                <button
                  onClick={handleBookNow}
                  className="min-w-full sm:w-auto inline-block text-center cursor-pointer bg-teal-600 hover:bg-teal-700 text-white font-semibold px-20 py-4 rounded-lg transition-colors text-lg "
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;