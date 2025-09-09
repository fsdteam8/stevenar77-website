import Image from "next/image";
import React from "react";

export default function Gallery() {
  const row1 = [
    { src: "/images/about9.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
    { src: "/images/about10.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
    { src: "/images/about11.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
  ];

  const row2 = [
    { src: "/images/about12.png", span: "lg:col-span-3", height: "h-60 sm:h-72 md:h-[500px]" },
    { src: "/images/about13.png", span: "lg:col-span-3", height: "h-60 sm:h-72 md:h-[500px]" },
    { src: "/images/about14.png", span: "lg:col-span-6", height: "h-60 sm:h-72 md:h-[500px]" },
  ];

  const row3 = [
    { src: "/images/about15.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
    { src: "/images/about16.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
    { src: "/images/about17.png", span: "lg:col-span-4", height: "h-40 sm:h-52 md:h-64" },
  ];

  const renderRow = (images: { src: string; span: string; height: string }[]) => (
    <div className="grid grid-cols-12 gap-4">
      {images.map((img, index) => (
        <div key={index} className={`col-span-12 sm:col-span-6 md:col-span-4 ${img.span}`}>
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
