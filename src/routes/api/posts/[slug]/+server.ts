import type { Post } from '$lib/types'
import { json, error, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({params}) => {
  const paths = import.meta.glob('$lib/assets/posts/*.md')
	for (const path in paths) {
		const slug = path.split('/').at(-1)?.replace('.md', '')
    if (slug === params.slug) {
      const file = await paths[path]();
      if (file && typeof file === 'object' && 'metadata' in file && slug) {
        const metadata = file.metadata as Omit<Post, 'slug'>
        const post = { ...metadata, slug } satisfies Post
        if (post.published) {
          return json(post);
        }
      }

      break;
    }
	}

  throw error(404, `Could not find ${params.slug}`);
}
