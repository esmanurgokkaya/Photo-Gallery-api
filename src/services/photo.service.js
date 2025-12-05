import photoModel from "../models/photo.model.js";
import s3Model from "../models/s3.model.js";
import env from "../utils/env.js";
import sharp from "sharp";

class PhotoService {
    async uploadPhotoToS3(file) {
        const image = sharp(file.buffer);
        const metaData = await image.metadata();

        const params = {
            Bucket: env.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const s3Result = await s3Model.uploadImage(params);        
        const photoUrl = `https://${env.bucketName}.s3.${env.bucketRegion}.amazonaws.com/${file.originalname}`;
        
        return { photoUrl, s3Result, 
            metadata: {
                dimensions: `${metaData.width}x${metaData.height}`,
                size: file.size,
                upload_date: new Date(),
            } }; 
    

    }
    async uploadPhotoToDB(data) {
        return await photoModel.createPhoto(data);
    }
}

export default new PhotoService();