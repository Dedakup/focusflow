import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_ISSUER: process.env.AUTH0_ISSUER,
    DYNAMODB_TASKS_TABLE: process.env.DYNAMODB_TASKS_TABLE,
    DYNAMODB_USERS_TABLE: process.env.DYNAMODB_USERS_TABLE,
    S3_ASSETS_BUCKET: process.env.S3_ASSETS_BUCKET,
};
