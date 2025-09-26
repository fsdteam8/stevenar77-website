import Image from "next/image";
import React from "react";

interface GalleryProps {
  images: { url: string; _id: string }[];
}

export default function Gallery({ images }: GalleryProps) {
  // Keep the same layout structure
  const row1 = images.slice(0, 3).map((img) => ({
    src: img.url,
    span: "lg:col-span-4",
    height: "h-40 sm:h-52 md:h-64",
  }));

  const row2 = images.slice(3, 6).map((img, index) => {
    const span = index === 2 ? "lg:col-span-6" : "lg:col-span-3";
    return {
      src: img.url,
      span,
      height: "h-60 sm:h-72 md:h-[500px]",
    };
  });

  const row3 = images.slice(6, 9).map((img) => ({
    src: img.url,
    span: "lg:col-span-4",
    height: "h-40 sm:h-52 md:h-64",
  }));

  const renderRow = (row: { src: string; span: string; height: string }[]) => (
    <div className="grid grid-cols-12 gap-4">
      {row.map((img, index) => (
        <div
          key={index}
          className={`col-span-12 sm:col-span-6 md:col-span-4 ${img.span}`}
        >
          <Image
            src={img.src}
            alt={`Gallery Image ${index + 1}`}
            width={1920}
            height={1080}
            className={`w-full ${img.height} object-cover rounded-xl shadow-md`}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto p-4 md:p-0 my-10 md:my-20 space-y-4">
      {renderRow(row1)}
      {renderRow(row2)}
      {renderRow(row3)}
    </div>
  );
}
