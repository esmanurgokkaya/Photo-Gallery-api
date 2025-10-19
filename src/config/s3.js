import { S3Client } from '@aws-sdk/client-s3';
import env from "../utils/env.js";

const s3 = new S3Client({
    credentials: {
        accessKeyId: env.accessKeyId,
        secretAccessKey: env.secretAccessKey,
    },
    region: env.bucketRegion,
});

export default s3;
