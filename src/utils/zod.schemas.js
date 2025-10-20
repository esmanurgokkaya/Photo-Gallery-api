import { z } from 'zod';

const albumSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});

const updateAlbumSchema = albumSchema.partial();

export { albumSchema, updateAlbumSchema };
