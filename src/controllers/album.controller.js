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
               return res.status(400).json({ 
                error: 'Validation failed', 
                details: error.issues.map(issue => ({path: issue.path.join('.'),
                    message: issue.message })) 
                 });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAlbumById(req, res){
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid album ID' });
            }
            const album = await AlbumService.getAlbumById(id);
            if (!album) {
                return res.status(404).json({ error: 'Album not found' });
            }
            res.status(200).json(album);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async getAllAlbums(req, res){
        try {
            const { page, limit, sortBy, sortOrder } = req.query;
            const options = {
                page: parseInt(page) || 1,
                limit: parseInt(limit) || 20,
                sort: sortBy ? { [sortBy]: sortOrder || 'asc' } : { createdAt: 'desc' }
            };
            const albums = await AlbumService.getAllAlbums(options);
            res.status(200).json(albums);
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({ error: 'Validation failed', details: error.issues.map(issue => ({ path: issue.path.join('.'), message: issue.message })) });
            }
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    async updateAlbumById(req, res){
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid album ID' });
            }
            console.log('Updating album with ID:', id);
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
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid album ID' });
            }
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