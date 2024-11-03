import {
    createClient,
    type SupabaseClient as SupabaseInternalClient,
} from "@supabase/supabase-js";
import type { Job } from "./types";

export class SupabaseClient {
    supabaseClient: SupabaseInternalClient;

    constructor() {
        this.supabaseClient = createClient(
            import.meta.env.VITE_SUPABASE_URL,
            import.meta.env.VITE_SUPABASE_KEY
        );
    }

    async fetchJobs(queryString: string | null): Promise<Job[]> {
        let searchPromise;
        if (queryString) {
            searchPromise = this.supabaseClient
                .from("jobs")
                .select()
                .textSearch("fts", queryString);
        } else {
            searchPromise = this.supabaseClient.from("jobs").select();
        }

        const { data, error } = await searchPromise;
        if (error) {
            console.log(
                `Error response from Supabase: ${error.code} ${error.message} ${error.hint} ${error.details}`
            );
        }

        const jobs = (data as Job[]) ?? [];

        return jobs;
    }
}
