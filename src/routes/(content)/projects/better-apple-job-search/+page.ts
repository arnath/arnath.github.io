import type { PageLoad } from './$types';
import Database from 'better-sqlite3';

const db = new Database("$lib/assets/apple-jobs.db");

export const load: PageLoad = async () => {
};
