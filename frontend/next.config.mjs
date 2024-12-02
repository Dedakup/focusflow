/** @type {import('next').NextConfig} */

const nextConfig = {
    output: 'export',
    distDir: './build',
    experimental: {
        runtime: 'nodejs',
        serverComponents: true,
    },
};

export default nextConfig;
