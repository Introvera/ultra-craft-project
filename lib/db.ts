import { Pool, QueryResult, QueryResultRow } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Generic helper: query<T>() returns typed rows
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: any[],
): Promise<QueryResult<T>> {
  const res = await pool.query<T>(text, params);
  return res;
}