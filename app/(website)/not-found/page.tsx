import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-extrabold text-gray-800 animate-bounce">
          404
        </h1>
        <p className="text-xl md:text-2xl font-semibold mt-4 text-gray-600">
          Oops! Page not found
        </p>
        <p className="mt-2 text-gray-500">
          The page you are looking for might be removed or doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium shadow hover:bg-blue-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Page;
