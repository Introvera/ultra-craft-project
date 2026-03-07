import { Pool, QueryResult, QueryResultRow } from "pg";

// Decide whether to use SSL:
// - If DATABASE_SSL is explicitly "true", force SSL.
// - If DATABASE_SSL is explicitly "false", disable SSL.
// - Otherwise, default to SSL for non-local URLs.
const envSsl = process.env.DATABASE_SSL;
const shouldUseSsl =
  envSsl === "true" ||
  (!envSsl &&
    !process.env.DATABASE_URL?.includes("localhost") &&
    !process.env.DATABASE_URL?.includes("@db")); // Docker service name

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: shouldUseSsl
    ? {
        rejectUnauthorized: false,
      }
    : false,
});

// Generic helper: query<T>() returns typed rows
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> {
  const res = await pool.query<T>(text, params);
  return res;
}