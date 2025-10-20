import express from 'express';
import AlbumRouter from './album.route.js';
const router = express.Router();

router.use("/albums", AlbumRouter);

export default router;