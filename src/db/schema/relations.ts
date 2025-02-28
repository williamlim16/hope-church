import { relations } from "drizzle-orm";
import { lifeGroupTable } from "./life-group";
import { user } from "./auth";

export const userRelations = relations(user, ({ one }) => ({
  life_group: one(lifeGroupTable, {
    fields: [user.life_group_id],
    references: [lifeGroupTable.id],
  }),
}));

export const lifeGroupRelations = relations(user, ({ many }) => ({
  user: many(user)
}))
