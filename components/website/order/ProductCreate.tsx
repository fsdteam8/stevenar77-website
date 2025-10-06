/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCreateOrder } from "@/services/hooks/order/useCreateOrder";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useProductDetails } from "@/services/hooks/product/useProductDetails";

interface ProductCreateProps {
  productId: string;
  onClose?: () => void;
}
interface CreateOrderPayload {
  productId: string;
  quantity: number;
  variantName: string;  
  image?: File;
}

const ProductCreate: React.FC<ProductCreateProps> = ({
  productId,
  onClose,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data, isLoading, error } = useProductDetails(productId);

  // Auto-select first variant
  useEffect(() => {
    if (data?.data?.variants?.length) {
      setSelectedVariant(data.data.variants[0].name);
    }
  }, [data]);

  // Handle file selection
  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    setImages(newFiles); // overwrite previous images if needed
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setSelectedVariant(data?.data?.variants?.[0]?.name || "");
    setQuantity("");
    setImages([]);
    onClose?.();
  };

  const handleSubmit = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }
    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const file = images[0]; // only the first image

    // Log payload for debugging
    const payload: CreateOrderPayload = {
      productId,
      quantity: Number(quantity),
      variantName: selectedVariant,
      image: file,
    };

    createOrder(payload, {
      onSuccess: (res: any) => {
        handleCancel();
        if (res?.data?.sessionUrl) {
          window.location.href = res.data.sessionUrl;
        } else {
          toast.success("Order placed successfully!");
        }
      },
      onError: () => toast.error("Failed to place order. Try again."),
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="space-y-6">
        {/* Variant Selection & Quantity */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Select Variant & Quantity
          </p>
          <div className="flex items-center gap-4">
            {/* Variant Dropdown */}
            {/* // Variant Dropdown */}
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {data?.data?.variants?.map((v: any, i: number) => (
                <option key={i} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
            {/* Quantity Input */}
            <input
              type="number"
              min={0}
              placeholder="Qty"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value) || "")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">
            Mask Strap Design Picture
          </p>
          <div className="border-2 border-dashed rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400" />
              </div>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition"
              >
                <Upload className="w-4 h-4 mr-2" /> Choose Files
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Image Previews */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {images.map((file, index) => (
                <div key={index} className="relative group">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg border"
                    width={64}
                    height={64}
                  />
                  <Button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 shadow text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 bg-transparent text-teal-700 rounded-md hover:bg-teal-200 transition"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
          >
            {isPending ? "Placing Order..." : "Confirm Order"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
