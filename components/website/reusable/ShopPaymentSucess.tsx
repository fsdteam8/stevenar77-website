// components/website/reusable/ShopPaymentSuccess.tsx
import React from 'react';
import { CheckCircle } from 'lucide-react'; // Using lucide icon library, you can replace with any
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const ShopPaymentSuccess = () => {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8 text-center">
      <CheckCircle className="mx-auto mb-4 text-green-500" size={48} />
      <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-6">
        Thank you for your purchase. Your payment has been processed successfully.
      </p>
      <Button onClick={() => router.push('/shop')}>Back to Trips</Button>
    </div>
  );
};

export default ShopPaymentSuccess;
