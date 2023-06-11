import { env } from "process";

export const config = {
    BASE_URL: `${env.HOST}:${env.PORT}`,
    PORT: env.PORT,
    HOST: env.HOST,
    TOKEN_SECRET: env.TOKEN_SECRET,
    POSTGRES_URI: env.POSTGRES_URI || 'postgres://postgres:123456@localhost:5432',
    ENV: env.ENV,
    MOCK_DATA: !!env.MOCK_DATA || false
}