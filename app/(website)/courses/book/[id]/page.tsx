//courses/book/[id]
import { BookingPage } from '@/components/website/course/booking-page'
import React from 'react'

const page = () => {
  return (
    <div>
       <BookingPage />
    </div>
  )
}

export default page


// import { BookingPage } from '@/components/website/course/booking-page'
// import { BookingProvider } from '@/components/website/course/booking-context'
// import React from 'react'

// // Suppose you fetched course data here
// // Example: id from params
// const page = ({ params }: { params: { id: string } }) => {
//   const course = {
//     id: params.id,
//     name: "Open Water Diver",
//     price: 450,
//     age: "10+",
//     image: "/scuba-diving-underwater-scene.jpg", // replace with real course image URL
//   }


//   return (
//     <BookingProvider initialCourse={course}>
//       <BookingPage />
//     </BookingProvider>
//   )
// }

// export default page
