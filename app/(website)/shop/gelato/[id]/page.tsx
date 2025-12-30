// import Hero from '@/components/website/shared/Hero';
// import GelatoDetails from "@/components/website/shop/GelatoDetails";
import ProductCarousel from "@/components/website/shop/ProductCarousel";
// import ProductDetails from "@/components/website/shop/ProductDetails";
// import ProductReview from '@/components/website/shop/ProductReview';
// import ProductReviewDes from '@/components/website/shop/ProductReviewDes';
import React from "react";

// interface PageProps {
//   params: { id: string }; // dynamic segment e.g. /shop/product/[id]
// }

export default function Page() {
  // const productId = params.id;

  // TODO: Replace with real userId from auth (e.g. NextAuth session)

  return (
    <div className="bg-[#FFFEFD]">
      {/* <Hero
        title="Gear Up for Your Next Dive"
        subtitle="High-quality scuba equipment, apparel, and accessories — tested and trusted by divers worldwide. From masks to full dive computers, find everything you need for your underwater adventures."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      /> */}
      {/* <GelatoDetails /> */}
      {/* <ProductDetails /> */}
      {/* <ProductReviewDes   /> */}
      {/* <ProductReview userId={userId} productId={productId} /> */}
      <ProductCarousel />
    </div>
  );
}
