import AlbumService from '../services/album.service.js';
import { albumSchema, updateAlbumSchema } from '../utils/zod.schemas.js';
import { ZodError } from 'zod';

class AlbumController {
    async createAlbum(req, res){
        try {
            const validatedData = albumSchema.parse(req.body);
            const album = await AlbumService.createAlbum(validatedData);
            res.status(201).json(album);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAlbumById(req, res){
        try {
            const { id } = req.params;
            const album = await AlbumService.getAlbumById(id);
            if (!album) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(album);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllAlbums(req, res){
        try {
            const albums = await AlbumService.getAllAlbums();
            res.status(200).json(albums);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateAlbumById(req, res){
        try {
            const { id } = req.params;
            const validatedData = updateAlbumSchema.parse(req.body);
            const album = await AlbumService.updateAlbumById(id, validatedData);
            if (!album) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(album);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async deleteAlbumById(req, res){
        try {
            const { id } = req.params;
            const album = await AlbumService.deleteAlbumById(id);
            if (!album) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json({ message: 'Album deleted successfully' });
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: error.message });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

export default new AlbumController();