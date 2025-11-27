import Prisma from '../config/prisma.client.js';

const Album = Prisma.album;

class AlbumModel {
    async createAlbum(data){
        return await Album.create( { data } );
    }

    async getAlbumById(id){
        return await Album.findUnique( { where: { id } } );

    }

    async getAllAlbums(options = {}){
        // options: { page = 1, limit = 20, filter = {}, sort = {} }
        const page = Math.max(1, parseInt(options.page) || 1);
        const rawLimit = parseInt(options.limit) || 20;
        const MAX_LIMIT = 100;
        const limit = Math.min(MAX_LIMIT, Math.max(1, rawLimit));
        
        // Whitelist allowed filter fields
        const allowedFilterFields = ['title', 'userId', 'isPublic'];
        
        // Whitelist allowed filter fields
        const filter = {};
        if (options.filter && typeof options.filter === 'object') {
            for (const key of Object.keys(options.filter)) {
                if (allowedFilterFields.includes(key)) {
                    filter[key] = options.filter[key];
                }
            }
        }
        // Whitelist allowed sort fields
        const allowedSortFields = ['title', 'createdAt', 'updatedAt'];
        const sort = {};
        if (options.sort && typeof options.sort === 'object') {
            for (const key of Object.keys(options.sort)) {
                if (allowedSortFields.includes(key) && ['asc', 'desc'].includes(options.sort[key])) {
                    sort[key] = options.sort[key];
                }
            }
        }

        const offset = (page - 1) * limit;

        // Prisma query: findMany with skip & take, and orderBy
        const [items, total] = await Promise.all([
            Album.findMany({ where: filter, orderBy: sort, skip: offset, take: limit }),
            Album.count({ where: filter })
        ]);

        const totalPages = Math.ceil(total / limit) || 1;

        return {
            items,
            meta: {
                page,
                limit,
                total,
                totalPages
            }
        };

    }

    async updateAlbumById(id, data){
        return await Album.update( { where: { id } , data } );

    }

    async deleteAlbumById(id){
        return await Album.delete( { where: { id } } );
    }
}

export default new AlbumModel();
