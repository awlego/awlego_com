import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;
export type PostType = 'poem' | 'newsletter' | 'research' | 'essay';

/**
 * Published posts for the writing listings, newest first.
 * "About Me" posts (personality tests, resume) live on the About page instead.
 */
export async function getWritingPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => data.published !== false && !data.categories?.includes('About Me'));
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/**
 * Classify a post for its type badge and listing filters.
 */
export function getPostType(post: Post): PostType {
  if (post.data.categories?.includes('Poems') || post.data.tags?.includes('poem')) {
    return 'poem';
  }
  if (post.data.tags?.includes('decibel') || post.data.categories?.includes('Newsletter')) {
    return 'newsletter';
  }
  if (post.data.tags?.includes('research')) {
    return 'research';
  }
  return 'essay';
}
