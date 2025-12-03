import PhotoService from '../services/photo.service.js';
// import { photoSchema } from '../utils/zod.schemas.js';
import { ZodError } from 'zod';
import env from "../utils/env.js";

class PhotoController {

    async uploadPhoto (req, res) {
        try {
            console.log("req.file", req.file);
            console.log("body", req.body);
   
            const result = await PhotoService.uploadPhotoToS3(req.file);

            const photoUrl = `https://${env.bucketName}.s3.${env.bucketRegion}.amazonaws.com/${req.file.originalname}`;

            const photoData = {
                photo_url: photoUrl,
            };

            const dbResult = await PhotoService.uploadPhotoToDB(photoData);
            // Başarılı yanıt
            res.status(200).json({
                message: 'File uploaded successfully',
                photoUrl: photoUrl,
                s3Result: result,
                dbResult: dbResult
            });
            
        } catch (error) {
            console.error('S3 Upload Error:', error);
            res.status(500).json({
                error: 'Upload failed',
                message: error.message,
                details: error.name
            });
        }
    }

}


export default new PhotoController();