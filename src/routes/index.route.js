import express from 'express';
import AlbumRouter from './album.route.js';
import PhotoRouter from './photo.route.js';
const router = express.Router();

router.use("/albums", AlbumRouter);
router.use("/photos", PhotoRouter);

export default router;