/** @type {import('next').NextConfig} */

const nextConfig = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'static/media/',
                        publicPath: '/_next/static/media/',
                        esModule: false,
                    },
                },
            ],
        });

        return config;
    },
};

export default nextConfig;
