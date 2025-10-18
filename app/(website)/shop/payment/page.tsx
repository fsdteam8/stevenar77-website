// // pages/payment.tsx (or wherever your page is)

// import { Button } from '@/components/ui/button';
// import ShopPaymentSucess from '@/components/website/reusable/ShopPaymentSucess';
// import { useRouter } from 'next/router';
// import React from 'react';

// const PaymentPage = () => {
//   const router = useRouter();

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <div className="container mx-auto">
//         <div className="flex flex-col items-center justify-center px-4 py-8 space-y-6">
//           {/* Go Back Button */}
//           <div className="w-full flex justify-start">
//             <Button variant="outline" onClick={() => router.push('/trips')}>
//               Back to Trips
//             </Button>
//           </div>

//           {/* Payment Success Card */}
//           <div className="w-full">
//             <ShopPaymentSucess />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
