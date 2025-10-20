import Prisma from '../config/prisma.client.js';

const Album = Prisma.Album;

class AlbumModel {
    async createAlbum(data){
        return await Album.create( { data } );
    }

    async getAlbumById(id){
        return await Album.findUnique( { where: { id } } );

    }

    async getAllAlbums(){
        return await Album.findMMany();

    }

    async updateAlbumById(id, data){
        return await Album.update( { where: { id } , data } );

    }

    async deleteAlbumById(id){
        return await Album.delete( { where: { id } } );
    }
}

export default new AlbumModel();
