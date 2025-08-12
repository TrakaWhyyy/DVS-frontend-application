import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: false
    /* config options here */
};

module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:8005/api/:path*',
            },
        ];
    },
};
export default nextConfig;
