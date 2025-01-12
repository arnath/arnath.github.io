import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = async () => {
    const paths = import.meta.glob("$lib/assets/posts/*.md", { eager: true });
    for (const path in paths) {
        const file = paths[path];
        const slug = path.split("/").at(-1)?.replace(".md", "");

        if (file && typeof file === "object" && "metadata" in file && slug) {
            const metadata = file.metadata as Omit<Post, "slug">;
            const post = { ...metadata, slug } satisfies Post;

            shouldShowPost(post) && posts.push(post);
        }
    }
};

export const load: PageLoad = async ({ params }) => {
    const file = await import(`../../../../lib/assets/posts/${params.slug}.md`);

    return { content: file.default, ...file.metadata };
};
