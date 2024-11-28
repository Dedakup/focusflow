/** @type {import('next').NextConfig} */
import process from 'process';

const nextConfig = {
    output: 'export',
    distDir: './build',
    experimental: {
        turbo: {
            rules: {
                // TypeScript/JavaScript
                '*.ts': {
                    loaders: ['swc-loader'],
                    as: '*.js',
                },
                '*.tsx': {
                    loaders: ['swc-loader'],
                    as: '*.js',
                },
                // CSS and Tailwind
                '*.css': {
                    loaders: ['postcss-loader'],
                },
                '*.module.css': {
                    loaders: ['postcss-loader'],
                },
                // Static assets
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },

            // Path aliases matching tsconfig
            resolveAlias: {
                '@': './src',
                '@app': './src/app',
                '@components': './src/components',
                '@features': './src/features',
                '@auth': './src/features/auth',
                '@background': './src/features/background',
                '@dashboard': './src/features/dashboard',
                '@music': './src/features/music',
                '@pomodoro': './src/features/pomodoro',
                '@sounds': './src/features/sounds',
                '@tasks': './src/features/tasks',
                '@shared': './src/shared',
                '@config': './src/shared/config',
                '@hooks': './src/shared/hooks',
                '@utils': './src/shared/utils',
                '@styles': './src/styles',
            },

            resolveExtensions: [
                '.tsx',
                '.ts',
                '.jsx',
                '.js',
                '.json',
                '.css',
                '.module.css',
            ],

            moduleIdStrategy: process.env.NODE_ENV === 'development' 
                ? 'named' 
                : 'deterministic',
        },
    },
};

export default nextConfig;
