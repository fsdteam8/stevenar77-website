// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { Upload, X } from "lucide-react";
// import Image from "next/image";
// import { useCreateOrder } from "@/services/hooks/order/useCreateOrder";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { useProductDetails } from "@/services/hooks/product/useProductDetails";

// interface ProductCreateProps {
//   productId: string;
//   onClose?: () => void;
// }

// interface ProductVariant {
//   _id: string;
//   title: string;
//   price: number;
//   quantity?: number;
//   image?: { url: string };
// }

// const ProductCreate: React.FC<ProductCreateProps> = ({
//   productId,
//   onClose,
// }) => {
//   const [selectedVariant, setSelectedVariant] = useState<string>("");
//   const [quantity, setQuantity] = useState<number | "">("");
//   // const [images, setImages] = useState<File[]>([]);
//   // const fileInputRef = useRef<HTMLInputElement>(null);

//   const [images, setImages] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const { mutate: createOrder, isPending } = useCreateOrder();
//   const { data, isLoading, error } = useProductDetails(productId);

//   // Auto-select first variant when product data loads
//   // useEffect(() => {
//   //   if (data?.data?.variants?.length) {
//   //     setSelectedVariant(data?.data?.variants[0]?.title);
//   //   }
//   // }, [data]);

//   useEffect(() => {
//   if (data?.data?.variants?.length) {
//     const firstVariant = data.data.variants[0];
//     setSelectedVariant(firstVariant.title);

//     // Convert variant image URL to File and set in images
//     const loadImage = async () => {
//       if (firstVariant?.image?.url) {
//         const file = await urlToFile(firstVariant?.image?.url, "variant-image");
//         setImages([file]);
//       }
//     };

//     loadImage();
//   }
// }, [data]);


//   const selectedVariantData = data?.data?.variants?.find(
//     (v) => v.title === selectedVariant,
//   );

//   // console.log(data);
//   // console.log(data?.data.variants[0]?.image);

//   const urlToFile = async (url: string, filename: string): Promise<File> => {
//   const res = await fetch(url);
//   const blob = await res.blob();
//   const extension = blob.type.split("/")[1] || "jpg";
//   return new File([blob], `${filename}.${extension}`, { type: blob.type });
// };

//   // Handle file selection
//   const handleFiles = (files: FileList) => {
//     const newFiles = Array.from(files).filter((file) => {
//       const validTypes = ["image/jpeg", "image/png", "image/jpg"];
//       const maxSize = 10 * 1024 * 1024; // 10MB
//       return validTypes.includes(file.type) && file.size <= maxSize;
//     });
//     setImages(newFiles);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) handleFiles(e.target.files);
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleCancel = () => {
//     setSelectedVariant(data?.data?.variants?.[0]?.title || "");
//     setQuantity("");
//     setImages([]);
//     onClose?.();
//   };

//   // const handleSubmit = () => {
//   //   if (!selectedVariant) {
//   //     toast.error("Please select a variant");
//   //     return;
//   //   }
//   //   if (!quantity || quantity < 1) {
//   //     toast.error("Please enter a valid quantity");
//   //     return;
//   //   }

//   //   const file = images[0];

//   //   // Build payload for backend
//   //   createOrder(
//   //     {
//   //       productId,
//   //       color: selectedVariant,
//   //       quantity: Number(quantity),
//   //       image: file,
//   //     },

//   //     {
//   //       onSuccess: (response: any) => {
//   //         handleCancel();
//   //         toast.success("Order placed successfully!");

//   //         // Redirect to Stripe session
//   //         const sessionUrl = response?.data?.sessionUrl;
//   //         if (sessionUrl) {
//   //           window.location.href = sessionUrl;
//   //         }
//   //       },
//   //       onError: () => toast.error("Failed to place order. Try again."),
//   //     },
//   //   );
//   // };
// const handleSubmit = async () => {
//   if (!selectedVariant) {
//     toast.error("Please select a variant");
//     return;
//   }

//   if (!quantity || quantity < 1) {
//     toast.error("Please enter a valid quantity");
//     return;
//   }

//   const imageUrl = selectedVariantData?.image?.url;

//   if (!imageUrl) {
//     toast.error("No image found for selected variant.");
//     return;
//   }

//   try {
//     // Fetch the image as a Blob (binary)
//     const response = await fetch(imageUrl);
//     if (!response.ok) throw new Error("Failed to fetch image");

//     const blob = await response.blob();

//     // Here you send the blob (binary data) directly to your backend
//     // Assuming createOrder accepts image as Blob or binary data
//     createOrder(
//       {
//         productId,
//         color: selectedVariant,
//         quantity: Number(quantity),
//         image: blob, // send raw binary blob
//       },
//       {
//         onSuccess: (response: any) => {
//           handleCancel();
//           toast.success("Order placed successfully!");

//           const sessionUrl = response?.data?.sessionUrl;
//           if (sessionUrl) {
//             window.location.href = sessionUrl;
//           }
//         },
//         onError: () => toast.error("Failed to place order. Try again."),
//       }
//     );
//   } catch (error) {
//     toast.error("Failed to process image for upload.");
//     console.error(error);
//   }
// };


//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading product.</p>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
//       {/* Variant + Quantity */}
//       <div className="mb-6">
//         <div className="flex  gap-2">
//           <div className="">
//             <p className="text-sm font-medium text-gray-700 mb-2">
//               Select Color & Quantity
//             </p>
//           </div>
//           <div className="">
//             {/* Available Quantity Display */}
//             {selectedVariantData?.quantity !== undefined && (
//               <span className="text-sm text-gray-500">
//                 In stock: <strong>{selectedVariantData?.quantity}</strong>
//               </span>
//             )}
//           </div>
//         </div>
//         {/* <div className="flex gap-4 items-center">
//           <div className="border-2 rounded-md">
//             <select
//               value={selectedVariant}
//               onChange={(e) => setSelectedVariant(e.target.value)}
//             >
//               {data?.data?.variants?.map((v: any, i: number) => (
//                 <option key={i} value={v.title}>
//                   {v.title}
//                 </option>
//               ))}
//             </select>
//           </div>
          
//           <input
//             type="number"
//             min={1}
//             placeholder="Qty"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value) || "")}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           />
//         </div> */}
//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
//           <div className="flex items-center gap-2">
//             <div className="border-2 rounded-md">
//               <select
//                 value={selectedVariant}
//                 onChange={(e) => setSelectedVariant(e.target.value)}
//                 className="px-2 py-1"
//               >
//                 {data?.data?.variants?.map((v: any, i: number) => (
//                   <option key={i} value={v.title}>
//                     {v.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <input
//             type="number"
//             min={1}
//             max={selectedVariantData?.quantity || undefined}
//             placeholder="Qty"
//             value={quantity}
//             onChange={(e) => setQuantity(Number(e.target.value) || "")}
//             className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
//           />
//         </div>
//       </div>

//       {/* Image Upload */}
//       <div className="mb-6">
//         <p className="text-sm font-medium text-gray-700 mb-2">
//           Selected Product&apos;s Picture
//         </p>
//         <div className="border-2 border-dashed rounded-lg p-6 text-center">
//           {/* Show variant image if selected */}
//           {selectedVariantData?.image?.url && (
//             <Image
//               src={selectedVariantData?.image?.url}
//               alt={selectedVariant}
//               width={200}
//               height={200}
//               className="mx-auto"
//             />
//           )}
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="flex justify-end gap-4 pt-6 border-t">
//         <Button
//           type="button"
//           onClick={handleCancel}
//           className="px-6 py-2 border border-gray-300 bg-transparent text-teal-700 rounded-md hover:bg-teal-200 transition"
//         >
//           Cancel
//         </Button>
//         <Button
//           type="button"
//           onClick={handleSubmit}
//           disabled={isPending}
//           className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
//         >
//           {isPending ? "Placing Order..." : "Confirm Order"}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductCreate;


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateOrder } from "@/services/hooks/order/useCreateOrder";
import { useProductDetails } from "@/services/hooks/product/useProductDetails";
import { toast } from "sonner";
import Image from "next/image";

interface ProductCreateProps {
  productId: string;
  onClose?: () => void;
}

// Updated variant type
interface ProductVariant {
  _id: string;
  title: string;
  price: number;
  quantity?: number;
  image?: { url: string };
}

const ProductCreate: React.FC<ProductCreateProps> = ({ productId, onClose }) => {
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createOrder, isPending } = useCreateOrder();
  const { data, isLoading, error } = useProductDetails(productId);

  // Get selected variant data
  const selectedVariantData: ProductVariant | undefined = data?.data?.variants?.find(
    (v) => v.title === selectedVariant
  );

  // Convert URL to File
  const urlToFile = async (url: string, filename: string): Promise<File> => {
    const res = await fetch(url);
    const blob = await res.blob();
    const extension = blob.type.split("/")[1] || "jpg";
    return new File([blob], `${filename}.${extension}`, { type: blob.type });
  };

  // Auto-select first variant and load its image
  useEffect(() => {
    if (data?.data?.variants?.length) {
      const firstVariant = data.data.variants[0];
      setSelectedVariant(firstVariant.title);

      if (firstVariant.image?.url) {
        urlToFile(firstVariant.image.url, "variant-image").then((file) =>
          setImages([file])
        );
      }
    }
  }, [data]);

  const handleFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter((file) => {
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSize = 10 * 1024 * 1024; // 10MB
      return validTypes.includes(file.type) && file.size <= maxSize;
    });
    setImages(validFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setSelectedVariant(data?.data?.variants?.[0]?.title || "");
    setQuantity("");
    setImages([]);
    onClose?.();
  };

  const handleSubmit = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    if (!quantity || quantity < 1) {
      toast.error("Please enter a valid quantity");
      return;
    }

    const imageUrl = selectedVariantData?.image?.url;

    if (!imageUrl) {
      toast.error("No image found for selected variant.");
      return;
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const file = new File([blob], `${selectedVariant}.jpg`, { type: blob.type });

      createOrder(
        {
          productId,
          color: selectedVariant,
          quantity: Number(quantity),
          image: file,
        },
        {
          onSuccess: (res: any) => {
            handleCancel();
            toast.success("Order placed successfully!");
            const sessionUrl = res?.data?.sessionUrl;
            if (sessionUrl) window.location.href = sessionUrl;
          },
          onError: () => toast.error("Failed to place order. Try again."),
        }
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to process image for upload.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading product.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      {/* Variant + Quantity */}
      <div className="mb-6">
        <div className="flex gap-2 items-center mb-2">
          <p className="text-sm font-medium text-gray-700">Select Color & Quantity</p>
          {selectedVariantData?.quantity !== undefined && (
            <span className="text-sm text-gray-500">
              In stock: <strong>{selectedVariantData.quantity}</strong>
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex items-center gap-2">
            <select
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              {data?.data?.variants?.map((v: ProductVariant) => (
                <option key={v._id} value={v.title}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          <input
            type="number"
            min={1}
            max={selectedVariantData?.quantity || undefined}
            placeholder="Qty"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || "")}
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Image Preview */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Selected Product&apos;s Picture</p>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          {selectedVariantData?.image?.url && (
            <Image
              src={selectedVariantData.image.url}
              alt={selectedVariant}
              width={200}
              height={200}
              className="mx-auto"
            />
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 border border-gray-300 bg-transparent text-teal-700 rounded-md hover:bg-teal-200 transition"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isPending}
          className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          {isPending ? "Placing Order..." : "Confirm Order"}
        </Button>
      </div>
    </div>
  );
};

export default ProductCreate;
