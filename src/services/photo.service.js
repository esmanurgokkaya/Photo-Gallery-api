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
        // Controller'a geri döndürülecek URL'yi burada oluştur
        const photoUrl = `https://${env.bucketName}.s3.${env.bucketRegion}.amazonaws.com/${file.originalname}`;
        
        return { photoUrl, s3Result }; 
    

    }
    async uploadPhotoToDB(data) {
        return await photoModel.createPhoto(data);
    }
}

export default new PhotoService();