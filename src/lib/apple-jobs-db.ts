import Database from "better-sqlite3";

const db = new Database("./src/lib/assets/apple-jobs.db", {
  verbose: console.log,
  readonly: true,
  fileMustExist: true,
});

export function getJobCount(): number {
  const statement = db.prepare("SELECT COUNT(*) FROM jobs");
  const result = statement.get() as number;

  return result;
}
