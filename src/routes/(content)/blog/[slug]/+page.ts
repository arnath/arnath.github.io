import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const file = await import(`../../../../lib/assets/posts/${params.slug}.md`);

  return { content: file.default, ...file.metadata };
}
