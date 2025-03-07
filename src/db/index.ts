import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from "@/env.js"
import * as schema from './schema/index'

import postgres from 'postgres'

const connectionString = env.DATABASE_URL

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(connectionString, {
  schema
});

