import Database from "better-sqlite3";
import type { Job } from "./types";

const db = new Database("./src/lib/assets/apple-jobs.db", {
  readonly: true,
  fileMustExist: true,
});

export function getJobs(): Job[] {
  const statement = db.prepare("SELECT * FROM jobs");
  const result = statement.all() as Job[];

  return result;
}
