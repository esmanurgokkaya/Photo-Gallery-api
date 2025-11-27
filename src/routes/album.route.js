import AlbumController from "../controllers/album.controller.js";
import express from 'express';

const router = express.Router();
router.post('/', AlbumController.createAlbum);          // POST /albums
router.get('/', AlbumController.getAllAlbums);           // GET /albums
router.get('/:id', AlbumController.getAlbumById);       // GET /albums/:id
router.put('/:id', AlbumController.updateAlbumById);    // PUT /albums/:id
router.delete('/:id', AlbumController.deleteAlbumById); // DELETE /albums/:id

export default router;
