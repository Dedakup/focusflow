const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    TIMEOUT: 5000,
    HEADERS: {
        'Content-Type': 'application/json',
    },
};