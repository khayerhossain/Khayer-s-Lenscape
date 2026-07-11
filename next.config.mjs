/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow all remote image sources — needed for user-uploaded URLs stored in MongoDB
    // Using unoptimized for external/DB images prevents Vercel hostname errors
    remotePatterns: [
      { protocol: 'https', hostname: 'i.ibb.co.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: '*.fbcdn.net' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      // Catch-all for any other domains in DB (covers user-uploaded URLs)
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    qualities: [60, 70, 75, 80, 100],
    // Disable optimization for external images to prevent Vercel hostname errors
    unoptimized: false,
  },
  // Ensure environment variables are available during build
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
