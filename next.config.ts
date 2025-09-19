// next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",  
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "gelato-api-live.s3.eu-west-1.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};
module.exports = nextConfig;