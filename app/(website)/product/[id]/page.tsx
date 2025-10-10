// app/product/[id]/page.tsx
"use client";

import Hero from "@/components/website/shared/Hero";
import ProductCarousel from "@/components/website/shop/ProductCarousel";
import ProductDetails from "@/components/website/shop/ProductDetails";
// import ProductReview from "@/components/website/shop/ProductReview";
// import ProductReviewDes from "@/components/website/shop/ProductReviewDes";
import React from "react";

// interface PageProps {
//   params: { id: string }; // dynamic segment e.g. /product/[id]
// }

export default function Page() {
  // const productId = params.id;

  // TODO: Replace with real userId from auth (e.g. NextAuth session)
  // const userId = "68bf6996f02adb6fb1fef5a0";

  return (
    <div className="bg-[#FFFEFD]">
      <Hero
        title="Customize Your Product with Gelato"
        subtitle="Explore unique Gelato products, ready to personalize. From mugs to apparel, discover creative items designed for you."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      
      {/* Unified Product Details handles both Admin & Gelato products */}
      <ProductDetails   />

      {/* Optional review sections */}
      {/* <ProductReviewDes /> */}
      {/* <ProductReview userId={userId} productId={productId} /> */}

      <ProductCarousel />
    </div>
  );
}
