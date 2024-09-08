import type { PageServerLoad } from "./$types";
import { getJobCount } from "$lib/apple-jobs-db";

export const load: PageServerLoad = async () => {
  console.log(getJobCount());
};
