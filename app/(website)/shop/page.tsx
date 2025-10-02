import StillHaveQuestion from "@/components/website/reusable/stillHaveQuestion";
import GilatoProduct from "@/components/website/shop/GilatoProduct";
// import Hero from "@/components/website/shared/Hero";
import Products from "@/components/website/shop/products";
import ProductsCombined from "@/components/website/shop/ProductsCombined";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <Hero
        title="Gear Up for Your Next Dive"
        subtitle="High-quality scuba equipment, apparel, and accessories — tested and trusted by divers worldwide. From masks to full dive computers, find everything you need for your underwater adventures."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      /> */}
      {/* <Products /> */}

      {/* <ProductsCombined /> */}
       <Products />
       <GilatoProduct />
      <StillHaveQuestion />
    </div>
  );
};

export default page;
