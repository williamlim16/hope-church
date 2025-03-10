import { drizzle } from 'drizzle-orm/postgres-js'
import { env } from "@/env.js"
import * as schema from './schema/index'

import postgres from 'postgres'

const connectionString = env.DATABASE_URL

export const client = postgres(connectionString, { prepare: false })
export const db = drizzle(connectionString, {
  schema
});
// import { drizzle } from 'drizzle-orm/postgres-js';
// import { env } from '@/env.js';
// import * as schema from './schema/index';
// import postgres from 'postgres';

// const connectionString = env.DATABASE_URL;

// // Singleton pattern for client and db
// let client;
// let db;

// if (process.env.NODE_ENV === 'development') {
//   // Reuse the same instance in development mode
//   if (!global.__client) {
//     global.__client = postgres(connectionString, { prepare: false });
//   }
//   if (!global.__db) {
//     global.__db = drizzle(global.__client, { schema });
//   }
//   client = global.__client;
//   db = global.__db;
// } else {
//   // Create new instances in production or other environments
//   client = postgres(connectionString, { prepare: false });
//   db = drizzle(client, { schema });
// }

// export { client, db };

