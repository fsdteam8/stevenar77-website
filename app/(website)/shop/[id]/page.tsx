import Hero from '@/components/website/shared/Hero'
import ProductCarousel from '@/components/website/shop/ProductCarousel'
import ProductDetails from '@/components/website/shop/ProductDetails'
import ProductReviewDes from '@/components/website/shop/ProductReviewDes'
import React from 'react'

const page = () => {
  return (
    <div className="bg-[#FFFEFD]">
        <Hero
        title="Gear Up for Your Next Dive"
        subtitle="High-quality scuba equipment, apparel, and accessories — tested and trusted by divers worldwide. From masks to full dive computers, find everything you need for your underwater adventures."
        backgroundImage="/images/imagewater.jpg"
        size="small"
      />
      <ProductDetails />
      <ProductReviewDes />
      <ProductCarousel />
    </div>
  )
}

export default page