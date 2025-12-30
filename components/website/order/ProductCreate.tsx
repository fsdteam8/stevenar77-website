"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useProductDetails } from "@/services/hooks/product/useProductDetails";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTripBooking } from "@/hooks/useTripBooking";
import { Card } from "@/components/ui/card";

interface ProductCreateProps {
  productId: string;
  onClose?: () => void;
}

interface ProductVariant {
  _id: string;
  title: string;
  price: number;
  quantity?: number;
  image?: { url: string };
}

const ProductCreate: React.FC<ProductCreateProps> = ({
  productId,
  onClose,
}) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [, setImages] = useState<File[]>([]);
  const { data, isLoading, error } = useProductDetails(productId);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.log("quantity", quantity);

  const { mutate: bookTrip } = useTripBooking();

  // Success modal state
  const [productBookingSuccess, setProductBookingSuccess] = useState(false);

  const selectedVariantData: ProductVariant | undefined =
    data?.data?.variants?.find((v) => v.title === selectedVariant);

  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    const extension = blob.type.split("/")[1] || "jpg";
    return new File([blob], `${filename}.${extension}`, { type: blob.type });
  };

  useEffect(() => {
    if (data?.data) {
      const { isVariant = true } = data.data; // Default to true if undefined, for backward compatibility? Or undefined check.
      // Actually based on request "If 'isVariant': true... If 'isVariant': false"
      // If data.data.isVariant is true or undefined (assuming current behavior is variant-based)
      // But user said "In the shop, all products are currently being displayed." implying existing ones work.

      if (isVariant && data.data.variants?.length) {
        const firstVariant = data.data.variants[0];
        setSelectedVariant(firstVariant.title);
        if (firstVariant.image?.url) {
          urlToFile(firstVariant.image.url, "variant-image").then((file) =>
            setImages([file]),
          );
        }
      } else if (!isVariant) {
        // Initialize for non-variant product if needed
        setSelectedVariant(""); // clear variant selection
        if (data.data.images?.[0]?.url) {
          urlToFile(data.data.images[0].url, "product-image").then((file) =>
            setImages([file]),
          );
        }
      }
    }
  }, [data]);

  const handleCancel = () => {
    setSelectedVariant(data?.data?.variants?.[0]?.title || "");
    setQuantity("");
    setImages([]);
    onClose?.();
  };

  const { isVariant = true } = data?.data || {};

  const totalPrice =
    Number(quantity) *
    // (isVariant ? selectedVariantData?.price || 0 : data?.data?.price || 0);
    (data?.data?.price || 0);

  const handleSubmit = async () => {
    // Validation
    if (isVariant && !selectedVariant)
      return toast.error("Please select a variant");
    if (!quantity || quantity < 1) return toast.error("Enter valid quantity");

    let price = 0;
    let imageUrl = "";
    let color = "";

    if (isVariant) {
      imageUrl = selectedVariantData?.image?.url || "";
      if (!imageUrl) return toast.error("No image found for selected variant.");
      price = totalPrice;
      color = selectedVariant;
    } else {
      // Non-variant product
      imageUrl = data?.data?.images?.[0]?.url || "";
      if (!imageUrl) return toast.error("No image found for product.");
      price = totalPrice;
      color = data?.data?.title || "Default";
    }

    const payload = {
      userId: userId,
      itemId: productId,
      type: "product" as const,
      price: price,
      quantity: Number(quantity),
      color: color,
      images: [imageUrl],
    };

    bookTrip(payload, {
      onSuccess: () => {
        toast.success("Product added to cart!");
        setProductBookingSuccess(true);
      },
      onError: () => {
        toast.error("Failed to add product!");
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  // 🔥 SUCCESS MODAL LIKE YOUR TRIP DESIGN
  if (productBookingSuccess) {
    return (
      <Card className="max-h-[calc(100vh-10rem)] bg-white shadow-lg rounded-2xl text-center overflow-y-auto">
        <div className="flex flex-col items-center space-y-4">
          {/* Success Tick */}
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-gray-800">
            Added to Cart Successfully!
          </h2>

          {/* Product Info */}
          <div className="text-gray-600 text-lg">
            <p className="font-semibold text-gray-800">{data?.data?.title}</p>

            <p className="mt-1">
              {!isVariant && data?.data?.category ? (
                <>
                  Category:{" "}
                  <span className="font-semibold">{data.data.category}</span>
                </>
              ) : (
                <>
                  Color:{" "}
                  <span className="font-semibold">{selectedVariant}</span>
                </>
              )}
            </p>

            <p>
              Quantity: <span className="font-semibold">{quantity}</span>
            </p>

            <p className="mt-2 text-xl font-bold text-primary">
              Total: ${totalPrice.toLocaleString()}
            </p>
          </div>

          {/* Image */}
          <div className="mt-4">
            <Image
              src={
                (isVariant
                  ? selectedVariantData?.image?.url
                  : data?.data?.images?.[0]?.url) || "/images/placeholder.png"
              }
              alt="Product"
              width={300}
              height={300}
              className="rounded-xl shadow-md"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button
              className="bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/80"
              onClick={() => (window.location.href = "/shop")}
            >
              Continue Shopping
            </Button>

            <Button
              className="bg-primary text-white text-lg py-3 rounded-xl hover:bg-primary/80"
              onClick={() => (window.location.href = "/cart")}
            >
              Go to Cart
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <div className="flex gap-2 items-center mb-2">
          <p className="text-sm font-medium text-gray-700">
            Select Color & Quantity
          </p>
          {isVariant
            ? selectedVariantData?.quantity !== undefined && (
                <span className="text-sm text-gray-500">
                  In stock: <strong>{selectedVariantData.quantity}</strong>
                </span>
              )
            : data?.data?.productQuantity !== undefined && (
                <span className="text-sm text-gray-500">
                  In stock: <strong>{data.data.productQuantity}</strong>
                </span>
              )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          {/* Variant dropdown - Show only if isVariant is TRUE */}
          {isVariant ? (
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              {data?.data?.variants?.map((v: ProductVariant) => (
                <option key={v._id} value={v.title}>
                  {v.title}
                </option>
              ))}
            </select>
          ) : (
            // If not variant, show category if needed or just nothing here
            data?.data?.title && (
              <div className="px-2 py-1 border rounded-md bg-gray-100 text-gray-700">
                {data.data.title}
              </div>
            )
          )}

          {/* Quantity Input */}
          <input
            type="number"
            min={1}
            max={
              isVariant
                ? selectedVariantData?.quantity
                : data?.data?.productQuantity
            }
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || "")}
            className="w-1/4 px-3 py-2 border rounded-md"
          />
        </div>
      </div>

      {/* Show Image */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Selected Product&apos;s Picture
        </p>

        <div className="border-2 border-dashed rounded-lg p-2 text-center max-h-64 overflow-auto">
          {isVariant ? (
            selectedVariantData?.image?.url ? (
              <Image
                src={selectedVariantData.image.url}
                alt={selectedVariant}
                width={400}
                height={400}
                className="mx-auto rounded-xl object-contain"
              />
            ) : (
              <p>No Image Available</p>
            )
          ) : data?.data?.images?.[0]?.url ? (
            <Image
              src={data.data.images[0].url}
              alt={data.data.title}
              width={400}
              height={400}
              className="mx-auto rounded-xl object-contain"
            />
          ) : (
            <p>No Image Available</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border bg-transparent text-teal-700 rounded-md"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-teal-600 text-white rounded-md"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCreate;
