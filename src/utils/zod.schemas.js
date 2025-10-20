import zod from 'zod';

const albumSchema = zod.object({
    title: zod.string().min(2).max(100),
    description: zod.string().max(500).optional(),
    createdAt: zod.date().default(() => new Date()),
    updatedAt: zod.date().default(() => new Date()),
});

const updateAlbumSchema = albumSchema.partial();

export { albumSchema, updateAlbumSchema };
