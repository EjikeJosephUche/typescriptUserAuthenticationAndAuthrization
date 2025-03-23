import dotenv from 'dotenv'
dotenv.config();
export const getEnvironmentVariable = (key: string, defaultVal?: string): string => {
    const value = process.env[key] || defaultVal;
    if (value === undefined){
        throw new Error (`Environment variable ${key} is undefined`);
    }
    return value
}

export const DB_URI = getEnvironmentVariable("DB_URI");
export const JWT_SECRET = getEnvironmentVariable("JWT_SECRET");