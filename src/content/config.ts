import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tours = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/tours" }),
    schema: ({ image }) => z.object({
        title: z.string(),
        difficulty: z.enum(['Easy', 'Moderate', 'Hard', 'Expert']),
        difficultyNote: z.string(),
        duration: z.string(),
        distance: z.string(),
        elevationGain: z.string(),
        bestSeason: z.array(z.string()),
        groupSize: z.string(),
        region: z.string(),
        terrainType: z.string(),
        accessNotes: z.string(),
        includes: z.array(z.string()),
        image: image().optional(),
        featured: z.boolean().default(false),
    }),
});

const locations = defineCollection({
    loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/locations" }),
    schema: z.object({
        name: z.string(),
        region: z.string(),
        terrain: z.string(),
        highlights: z.array(z.string()),
    }),
});

export const collections = { tours, locations };
