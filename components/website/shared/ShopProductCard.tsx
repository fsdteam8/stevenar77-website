"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ShopProductCard as ShopProductCardType } from "@/types/shopProductCard";
import { ProductCreateModal } from "@/components/modals/ProductCreateModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ShopProductCard: React.FC<ShopProductCardType> = ({
  image,
  title,
  description,
  rating,
  reviews,
  price,
  onSeeMore,

  id,
}) => {
  const router = useRouter();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleBookNow = () => {
    const redirectPath = `/shop/${id}`;
    //  Then check login
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", redirectPath);
      setShowLoginModal(true);
      return;
    }
    setIsCreateOpen(true);
  };

  return (
    <div className="w-full h-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md bg-white flex flex-col">
      {/* Image */}
      <div className="relative w-full h-56">
        <Image src={image} alt={title} fill className="object-cover" priority />
      </div>

      <div className="bg-[#F8F9FA] py-2 flex-1 flex flex-col justify-between">
        {/* Content */}
        <div className="flex flex-col  flex-1 p-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p
            className="text-sm text-gray-500 mt-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-gray-400">({reviews} reviews)</span>
          </div>

          {/* Price */}
          <p className="mt-3 text-2xl font-semibold text-gray-800">${price}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-4">
          <Button
            variant="outline"
            className="flex-1 text-base font-medium text-[#0694A2]"
            onClick={onSeeMore}
          >
            See Details
          </Button>
          <Button
            className="flex-1 bg-[#0694A2] text-base font-medium text-white hover:bg-cyan-700"
            onClick={handleBookNow}
          >
            Buy Now
          </Button>
        </div>
      </div>
      <ProductCreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        productId={id}
      />
      <Dialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <DialogContent className="!max-w-xl">
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to purchase this product. Please login to
              continue.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowLoginModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowLoginModal(false);
                router.push("/login");
              }}
            >
              Login Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopProductCard;
