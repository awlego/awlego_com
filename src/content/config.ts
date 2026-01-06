import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
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
