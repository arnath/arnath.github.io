import type { PageServerLoad, RequestEvent } from "./$types";
import type { Actions } from "./$types";
import { SupabaseClient } from "$lib/supabase-client";

export const prerender = false;

export const load: PageServerLoad = async ({ url }) => {
    const queryString = url.searchParams.get('queryString');
    const supabaseClient = new SupabaseClient();
    const jobs = await supabaseClient.fetchJobs(queryString);

    return {
        jobs,
    };
};

// export const actions = {
//     default: async () => {},
// } satisfies Actions;
