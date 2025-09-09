import CourseFeatured from '@/components/website/course/CourseFeatured'
import FeaturedClasses from '@/components/website/landing/FeaturedClasses'
import HomeHero from '@/components/website/landing/Hero'
import UpcomingFetured from '@/components/website/schedule/UpcomingFetured'




import React from 'react'

export default function page() {
  return (
    <div className=' py-10'>
      <HomeHero />
      <FeaturedClasses />
      <CourseFeatured />
      <UpcomingFetured />

    </div>
  )
}
