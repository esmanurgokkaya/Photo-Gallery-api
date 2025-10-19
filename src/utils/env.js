import dotenv from 'dotenv';
dotenv.config();

const env = {
    databaseUrl: process.env.DATABASE_URL,
    bucketName: process.env.BUCKET_NAME,
    bucketRegion: process.env.BUCKET_REGION,
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default env;
