// components/website/reusable/ShopPaymentCancel.tsx
import React from 'react';
import PaymentCard from '@/components/website/reusable/PaymentCard';
import { useRouter } from 'next/router';
import { Button } from '@/components/ui/button';

const ShopPaymentCancel = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <PaymentCard
          title="Payment Cancelled"
          titleColor="text-red-600"
          message="Your payment was not completed. You can try again or return to browse Trips."
        />
        <div className="mt-6 flex justify-center">
          <Button onClick={() => router.push('/trips')}>Go Back to Trips</Button>
        </div>
      </div>
    </div>
  );
};

export default ShopPaymentCancel;
