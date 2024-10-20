/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    staticPageGenerationTimeout: 1000, // Handles timeouts for static file generation
    images: {
      unoptimized: true, // Ensures image optimization doesn't interfere with static files
    },
  };
  
  export default nextConfig;
  