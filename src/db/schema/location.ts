import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const locationTable = pgTable('location', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});

export type InsertLocation = typeof locationTable.$inferInsert;
export type SelectLocation = typeof locationTable.$inferSelect;
export type NullishLocation = InsertLocation | undefined;
