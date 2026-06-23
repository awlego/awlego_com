import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    // Preserve legacy slugs: use the filename (sans extension) verbatim.
    // The glob loader's default generateId slugifies, which would turn
    // e.g. "poem.36" into "poem-36" and change every dotted poem URL.
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    date_created: z.coerce.date().optional(),
    published: z.boolean().default(true),
    categories: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    status: z.string().optional(),
    confidence: z.string().optional(),
    importance: z.number().optional(),
    image: z.string().optional(),
    permalink: z.string().optional(),
    toc: z.boolean().optional(),
  }),
});

export const collections = { posts };
