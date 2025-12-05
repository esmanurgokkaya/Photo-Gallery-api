import PhotoService from '../services/photo.service.js';
import { photoSchema } from '../utils/zod.schemas.js';
import { ZodError } from 'zod';


class PhotoController {

    async uploadPhoto (req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const validateData = photoSchema.parse(req.body);
            console.log("req.file", req.file);
            console.log("validated body", validateData);
   
            const { photoUrl, s3Result, metaData } = await PhotoService.uploadPhotoToS3(req.file);


            const photoData = {
                photo_url: photoUrl,
                metadata: metaData,
                tagIds: validateData.tagIds,
                albumIds: validateData.albumIds
            };

            const dbResult = await PhotoService.uploadPhotoToDB(photoData);
            
            res.status(201).json({
                message: 'Photo uploaded successfully',
                photo: dbResult,
                s3Result: s3Result
            });
            
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ 
                    error: 'Validation failed', 
                    details: error.issues.map(issue => ({
                        path: issue.path.join('.'),
                        message: issue.message 
                    })) 
                });
            }
            console.error('Upload Error:', error);
            res.status(500).json({
                error: 'Upload failed',
                message: error.message
            });
        }
    }

}


export default new PhotoController();