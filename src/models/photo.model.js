import e from 'express';
import Prisma from '../config/prisma.client.js';

const Photo = Prisma.photo;

class PhotoModel {
    async createPhoto(data) {
        const tagsConnect = data.tagIds && data.tagIds.length > 0
            ? { connect: data.tagIds.map(id => ({ id })) }
            : undefined;

        const albumsConnect = data.albumIds && data.albumIds.length > 0
            ? { connect: data.albumIds.map(id => ({ id })) }
            : undefined;

        const metadataCreate = data.metadata ? { create: data.metadata } : undefined;

        const photoData = {
            photo_url: data.photo_url,
            ...(tagsConnect && { tags: tagsConnect }), 
            ...(albumsConnect && { albums: albumsConnect }),
            ...(metadataCreate && { metadata: metadataCreate })
        };

        return await Prisma.photo.create({ 
            data: photoData,
            include: {
                tags: true,
                albums: true
            }
        });
    }

}


export default new PhotoModel();
