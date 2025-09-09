"use client"
import StillHaveQuestion from '@/components/website/reusable/stillHaveQuestion'
import Hero from '@/components/website/shared/Hero'
import React from 'react'

const page = () => {
  return (
    <div>
      <Hero 
      title="All Scuba Courses"
      subtitle="Start your underwater adventure with our comprehensive beginner courses. From your first breath underwater to becoming a certified diver."
      backgroundImage="/images/imagewater.jpg"
      />
        <StillHaveQuestion />
    </div>
  )
}

export default page