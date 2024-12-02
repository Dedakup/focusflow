import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/dashboard/', // Protect private dashboard routes
                '/api/', // Protect API routes
            ],
        },
        sitemap: 'https://focusflow.4pr.me/sitemap.xml',
    };
}
