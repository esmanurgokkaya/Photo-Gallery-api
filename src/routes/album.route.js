import AlbumController from "../controllers/album.controller.js";
import express from 'express';

const router = express.Router();
router.post('/', AlbumController.createAlbum);
router.get('/:id', AlbumController.getAlbumById);
router.get('/', AlbumController.getAllAlbums);
router.put('/:id', AlbumController.updateAlbumById);
router.delete('/:id', AlbumController.deleteAlbumById);

export default router;
