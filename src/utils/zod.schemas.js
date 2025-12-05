import { z } from 'zod';

const albumSchema = z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(500).optional(),
});

const updateAlbumSchema = z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
});


const ReusableArraySchema = z.preprocess(
    (val) => (val === undefined || val === null ? "" : String(val)),
    
    z.string()
        .optional()
        .transform((str) => {
            if (!str || str.trim() === "") {
                return [];
            }
            return str.split(',')
                      .map(id => parseInt(id.trim()))
                      .filter(id => !isNaN(id) && id > 0);
        })
        .array(z.number()) 
).optional().default([]);


const photoSchema = z.object({
    tagIds: ReusableArraySchema,
    albumIds: ReusableArraySchema
});



export { albumSchema, updateAlbumSchema, photoSchema };