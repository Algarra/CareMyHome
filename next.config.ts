import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
    ],
  },
  redirects: async () => [
    {
      source:
        "/:path((?!en|es|fr|de|it|creator|sitemap-0.xml|login|api|sw|sitemap.xml|manifest.json|favicon.ico|img|robots.txt).*)", // Exclude specific paths
      destination: "/en/:path*", // Redirige a /en/
      permanent: true, // Redirección 301 (permanente)
    },
  ],
};

export default nextConfig;
