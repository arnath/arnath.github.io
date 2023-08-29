import type { Post } from '$lib/types'
import { json } from '@sveltejs/kit'

export async function GET() {
  let posts: Post[] = []

  const paths = import.meta.glob('$lib/assets/posts/*.md', { eager: true })
	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>
			const post = { ...metadata, slug } satisfies Post
			post.published && posts.push(post)
		}
	}

  posts = posts.sort((first, second) =>
    new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return json(posts);
}
