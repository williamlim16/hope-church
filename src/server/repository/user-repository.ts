import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function updateUserLifeGroup(userId: string, lifeGroupId: string) {
  await db.update(user).set({
    life_group_id: lifeGroupId
  }).where(eq(user.id, userId))
}
