import PhotoController from '../controllers/photo.controller.js';
import upload from '../middlewares/multer.middleware.js';
import express from 'express';

const router = express.Router();
router.post('/', upload.single('avatar'), PhotoController.uploadPhoto);        


export default router;