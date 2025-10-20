import AlbumModel from '../models/album.model.js';

class AlbumService {
    async createAlbum(data){
        return await AlbumModel.createAlbum(data);
    }
    async getAlbumById(id){
        return await AlbumModel.getAlbumById(id);
    }
    async getAllAlbums(){
        return await AlbumModel.getAllAlbums();
    }
    async updateAlbumById(id, data){
        return await AlbumModel.updateAlbumById(id, data);
    }
    async deleteAlbumById(id){
        return await AlbumModel.deleteAlbumById(id);
    }

}

export default new AlbumService();