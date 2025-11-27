"use client";

import { useCart, useDeleteCart, useProceedToPayment } from "@/hooks/useCart";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { CartItem, ProceedToPaymentPayload } from "@/types/cart";
import Link from "next/link";

export default function CartPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id as string | undefined;

  const { data: cartData, isLoading, error } = useCart(userId);
  const deleteCartMutation = useDeleteCart(userId);
  const proceedToPaymentMutation = useProceedToPayment(userId);

  const cartItems: CartItem[] = cartData?.data || [];

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0,
  );

  // Proceed to payment
  const handleProceedToPayment = () => {
    if (!userId || cartItems.length === 0) {
      toast.error("No items in cart or user not logged in");
      return;
    }

    const payload: ProceedToPaymentPayload = {
      cartsIds: cartItems.map((item) => item._id),
      totalPrice,
      userId,
    };

    proceedToPaymentMutation.mutate(payload, {
      onSuccess: (res) => {
        toast.success("Redirecting to payment...");
        if (res?.data?.sessionUrl) {
          window.location.href = res.data.sessionUrl;
        } else {
          toast.error("Failed to get checkout URL");
        }
      },
      onError: () => {
        toast.error("Failed to proceed to payment");
      },
    });
  };

  // Delete cart item
  const handleDeleteItem = (cartId: string) => {
    deleteCartMutation.mutate(cartId, {
      onSuccess: () => {
        toast.success("Cart item deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete cart item");
      },
    });
  };

  const getItemCount = (item: CartItem) => {
    if (item.participants && item.participants.length > 0) {
      return item.participants.length;
    }
    if (item.quantity) {
      return item.quantity;
    }
    return 1;
  };

  // Save course items with formTitle to localStorage
  // Save course items with extra details to localStorage
  React.useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    const courseItems = cartItems
      .filter((item) => item.type === "course")
      .map((item) => ({
        cartId: item._id,
        itemId: item.itemId,
        bookingId: item.bookingId,
        formTitle: item.details?.formTitle || [],
        title: item.details?.title || "No title",
        Username: item.details?.Username || "",
        email: item.details?.email || "",
      }));

    const dataToStore = {
      course: courseItems,
    };

    localStorage.setItem("courseFormTitles", JSON.stringify(dataToStore));
  }, [cartItems]);

  if (status === "loading")
    return (
      <p className="text-center mt-20 text-gray-500">Loading session...</p>
    );
  if (!userId)
    return (
      <p className="text-center mt-20 text-gray-500">
        Please login to see your cart
      </p>
    );
  if (isLoading)
    return <p className="text-center my-20 text-gray-500">Loading cart...</p>;
  if (error)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load cart</p>
    );

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
        Review Your Cart
      </h1>
      <p className="text-center text-gray-600 mb-10">
        Please verify your items before moving to the payment step.
      </p>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Image</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Type</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Participants/Quantity</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => {
                let image = "/placeholder.png";
                if (item.details?.images) {
                  if (Array.isArray(item.details.images)) {
                    image = item.details.images[0]?.url || "/placeholder.png";
                  } else {
                    image = item.details.images.url || "/placeholder.png";
                  }
                }

                const title = item.details?.title || "No title";

                return (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <Image
                        src={image}
                        alt={title}
                        width={80}
                        height={60}
                        className="object-cover rounded-md"
                      />
                    </td>

                    <td className="py-3 px-4 font-medium text-gray-700">
                      {title}
                    </td>

                    <td className="py-3 px-4 capitalize text-gray-600">
                      {item.type}
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-800">
                      $ {item.details?.price?.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-center">
                      {getItemCount(item)}
                    </td>

                    <td className="py-3 px-4 font-semibold text-gray-800">
                      $ {item.price?.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDeleteItem(item._id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* Total Price */}
              <tr className="border-t bg-gray-50 font-bold">
                <td className="py-3 px-4 text-right" colSpan={5}>
                  Total:
                </td>
                <td className="py-3 px-4">$ {totalPrice.toLocaleString()}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="flex justify-center gap-4 text-center mt-8">
        <Link href="/">
          {" "}
          <button
            // onClick={handleProceedToPayment}
            className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 cursor-pointer"
          >
            Continue Shopping
          </button>
        </Link>
        <button
          onClick={handleProceedToPayment}
          className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/80 cursor-pointer"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
