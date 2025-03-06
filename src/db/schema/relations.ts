import { relations } from "drizzle-orm";
import { lifeGroupTable } from "./life-group";
import { user } from "./auth";
import { eventTable } from "./event";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const userRelations = relations(user, ({ one }) => ({
  life_group: one(lifeGroupTable, {
    fields: [user.life_group_id],
    references: [lifeGroupTable.id],
  }),
}));

export const lifeGroupRelations = relations(user, ({ many }) => ({
  user: many(user)
}))

export const usersToEvents = pgTable('users_to_event', {
  user_id: text('user_id').notNull().references(() => user.id),
  event_id: uuid('event_id').notNull().references(() => eventTable.id),
});
