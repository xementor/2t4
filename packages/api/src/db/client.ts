import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined
}

export const createDb = (DB_URL: string) => {
  // const conn = globalForDb.conn ?? postgres(DB_URL)
  // if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn

  const conn = postgres(DB_URL)

  const db = drizzle(conn, { schema })

  return db
}
