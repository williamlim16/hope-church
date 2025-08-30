import { pgTable, text, timestamp, uuid, pgEnum } from "drizzle-orm/pg-core"
import { locationTable } from "./location"

export const eventStatusEnum = pgEnum("event_status", ["draft", "published"])

export const eventTable = pgTable('event', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  event_date: timestamp('event_date').notNull(),
  status: eventStatusEnum().notNull().default("draft"),
  location_id: uuid('location_id').references(() => locationTable.id),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
})

export type InsertEvent = typeof eventTable.$inferInsert
export type SelectEvent = typeof eventTable.$inferSelect
export type NullishEvent = SelectEvent | undefined


