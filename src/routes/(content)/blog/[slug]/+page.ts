import type { EntryGenerator, PageLoad } from "./$types";

export const entries: EntryGenerator = async () => {
    const posts = import.meta.glob("$lib/assets/posts/*.md", { eager: false });
    const paths = Object.keys(posts);
    return paths.map((path) => {
        return { slug: path.split("/").at(-1)!.replace(".md", "") };
    });
};

export const load: PageLoad = async ({ params }) => {
    const file = await import(`../../../../lib/assets/posts/${params.slug}.md`);

    return { content: file.default, ...file.metadata };
};
