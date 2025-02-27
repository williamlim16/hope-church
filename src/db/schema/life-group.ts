import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const lifeGroupTable = pgTable('life_group', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  voucher: text('voucher').notNull(),
  updated_at: timestamp().$onUpdate(() => new Date()),
  created_at: timestamp().defaultNow().notNull(),
});


export type InsertLifeGroup = typeof lifeGroupTable.$inferInsert;
export type SelectLifeGroup = typeof lifeGroupTable.$inferSelect;
export type NullishLifeGroup = SelectLifeGroup | undefined;
