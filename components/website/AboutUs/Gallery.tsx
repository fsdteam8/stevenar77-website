import Image from "next/image";
import React from "react";

interface GalleryProps {
  images: { url: string; _id: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="container mx-auto p-4 md:p-0 my-10 md:my-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, index) => (
        <div key={img._id} className="w-full">
          <Image
            src={img.url}
            alt={`Gallery Image ${index + 1}`}
            width={1920}
            height={1080}
            className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl shadow-md"
          />
        </div>
      ))}
    </div>
  );
}
