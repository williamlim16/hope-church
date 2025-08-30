import { relations } from "drizzle-orm";
import { lifeGroupTable } from "./life-group";
import { user } from "./auth";
import { eventTable } from "./event";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { locationTable } from "./location";

export const userRelations = relations(user, ({ one }) => ({
  life_group: one(lifeGroupTable, {
    fields: [user.life_group_id],
    references: [lifeGroupTable.id],
  }),
}));

export const lifeGroupRelations = relations(user, ({ many }) => ({
  user: many(user)
}))

export const eventRelations = relations(eventTable, ({ one }) => ({
  location_id: one(locationTable, {
    fields: [eventTable.location_id],
    references: [locationTable.id]
  })
}))

export const usersToEvents = pgTable('users_to_event', {
  user_id: text('user_id').notNull().references(() => user.id),
  event_id: uuid('event_id').notNull().references(() => eventTable.id),
  driving: boolean('driving').notNull(),
  location_id: uuid('location_id').references(() => locationTable.id)
});

export const usersToEventsRelations = relations(usersToEvents, ({ one }) => ({
  location: one(locationTable, {
    fields: [usersToEvents.location_id],
    references: [locationTable.id]
  })
}))

export const locationRelations = relations(usersToEvents, ({ many }) => ({
  location: many(locationTable)
}))
