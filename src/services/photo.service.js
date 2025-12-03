import photoModel from "../models/photo.model.js";
import s3Model from "../models/s3.model.js";
import env from "../utils/env.js";

class PhotoService {
    async uploadPhotoToS3(file) {
        const params = {
            Bucket: env.bucketName,
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const s3Result = await s3Model.uploadImage(params);
        
        return  s3Result ;

    }
    async uploadPhotoToDB(photoData) {
        return await photoModel.createPhoto(photoData);
    }
}

export default new PhotoService();