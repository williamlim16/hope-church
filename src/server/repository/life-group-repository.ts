"use server"
import { db } from "@/db";
import { type InsertLifeGroup, lifeGroupTable, type SelectLifeGroup } from "@/db/schema/life-group";
import { eq } from 'drizzle-orm';

export async function createLifeGroup(data: InsertLifeGroup) {
  await db.insert(lifeGroupTable).values(data);
}

export async function getLifeGroups(): Promise<Array<SelectLifeGroup>> {
  return db.select().from(lifeGroupTable);
}

export async function getLifeGroupById(id: SelectLifeGroup['id']): Promise<
  Array<{
    id: string;
    name: string;
    voucher: string;
    created_at: Date;
    updated_at: Date | null;
  }>
> {
  return db.select().from(lifeGroupTable).where(eq(lifeGroupTable.id, id));
}

export async function updateLifeGroup(id: SelectLifeGroup['id'], data: Partial<Omit<SelectLifeGroup, 'id'>>) {
  await db.update(lifeGroupTable).set(data).where(eq(lifeGroupTable.id, id));
}

export async function deleteLifeGroup(id: SelectLifeGroup['id']) {
  await db.delete(lifeGroupTable).where(eq(lifeGroupTable.id, id));
}
