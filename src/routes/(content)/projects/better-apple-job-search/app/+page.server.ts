import type { PageServerLoad, RequestEvent } from "./$types";
import type { Actions } from "./$types";
import { SupabaseClient } from "$lib/supabase-client";

export const prerender = false;

export const load: PageServerLoad = async () => {
  const supabaseClient = new SupabaseClient();
  const jobs = await supabaseClient.fetchJobs();

  return {
    jobs,
  };
};

export const actions = {
  default: async () => {},
} satisfies Actions;
