import type { PageServerLoad } from "./$types";
import type { Actions } from "./$types";
import { getJobs } from "$lib/apple-jobs-db";

export const prerender = false;

export const load: PageServerLoad = async () => {
  const jobs = getJobs();

  return {
    jobs
  };
};

export const actions = { default: async (event) => {} } satisfies Actions;
