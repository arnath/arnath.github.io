import { mdsvex } from "mdsvex";
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import type { Config } from "@sveltejs/kit";
import type { MdsvexOptions } from "mdsvex";

const mdsvexOptions: MdsvexOptions = {
    extension: ".md",
};

const config: Config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
    kit: {
        adapter: adapter(),
    },
    extensions: [".svelte", ".svx", ".md"],
};

export default config;
