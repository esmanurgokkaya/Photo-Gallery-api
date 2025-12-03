import e from 'express';
import Prisma from '../config/prisma.client.js';

const Photo = Prisma.photo;

class PhotoModel {
    async createPhoto(photoData) {
        return await Photo.create({ 
            data: photoData 
        });
    }

}


export default new PhotoModel();
