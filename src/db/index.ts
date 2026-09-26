import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL?.trim();

const globalForDb = globalThis as typeof globalThis & {
  __saztikPool?: Pool;
  __saztikDb?: NodePgDatabase;
};

function createPool(): Pool {
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Copy .env.example to .env and set your Postgres connection string.",
    );
  }
  return new Pool({ connectionString: databaseUrl });
}

export const pool: Pool =
  globalForDb.__saztikPool ??
  (databaseUrl
    ? (() => {
        const p = createPool();
        if (process.env.NODE_ENV !== "production") globalForDb.__saztikPool = p;
        return p;
      })()
    : (null as unknown as Pool));

export const db: NodePgDatabase =
  globalForDb.__saztikDb ??
  (databaseUrl
    ? (() => {
        const d = drizzle(pool);
        if (process.env.NODE_ENV !== "production") globalForDb.__saztikDb = d;
        return d;
      })()
    : (null as unknown as NodePgDatabase));

/** True when a Postgres URL is configured. */
export const hasDatabase = Boolean(databaseUrl);
