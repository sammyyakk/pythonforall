/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    staticPageGenerationTimeout: 1000,
    images: {
      unoptimized: true,
    },
    webpack: (config, { isServer }) => {
      config.externals = [...(config.externals || []), 'canvas', 'jsdom']
      return config
    },
  };
  
  export default nextConfig;