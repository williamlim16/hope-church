
"use server"
import { db } from "@/db";
import { eventTable, type InsertEvent, type SelectEvent } from "@/db/schema";
import { type SelectLifeGroup } from "@/db/schema/life-group";
import { eq } from 'drizzle-orm';

export async function createEvent(data: InsertEvent) {
  await db.insert(eventTable).values(data)
}

export async function getEvents(): Promise<Array<SelectEvent>> {
  return db.query.eventTable.findMany()
}

export async function getEventById(id: SelectEvent['id']): Promise<SelectEvent | undefined> {
  return db.query.eventTable.findFirst({
    where: eq(eventTable.id, id)
  })
}

export async function updateEvent(id: SelectEvent['id'], data: Partial<Omit<SelectEvent, 'id'>>) {
  await db.update(eventTable).set(data).where(eq(eventTable.id, id))
}

export async function deleteEvent(id: SelectLifeGroup['id']) {
  await db.delete(eventTable).where(eq(eventTable.id, id))
}

export async function publishEvent(id: SelectLifeGroup['id']) {
  await db.update(eventTable).set({
    status: "published"
  }).where(eq(eventTable.id, id))
}

