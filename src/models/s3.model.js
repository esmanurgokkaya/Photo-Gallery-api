import s3 from '../config/s3.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import env from '../utils/env.js';

class s3Model {
    async uploadImage(params) {
        const command = new PutObjectCommand(params);
        const result = await s3.send(command);
        return result;            
    }
}

export default new s3Model();