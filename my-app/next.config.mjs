/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: ["lh3.googleusercontent.com"], // ✅ Add this line
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // ✅ allow Pexels images
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
    ],
  },
};

export default nextConfig;
