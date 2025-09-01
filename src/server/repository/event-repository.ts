import { db } from "@/db";
import {
  eventTable,
  usersToEvents,
  type InsertEvent,
  type SelectEvent,
} from "@/db/schema";
import { and, eq, like } from "drizzle-orm";
import { type IBaseRepository } from "./interface";

export class EventRepository
  implements IBaseRepository<SelectEvent, InsertEvent>
{
  async save(data: InsertEvent): Promise<void> {
    await db.insert(eventTable).values(data);
  }
  async findMany({
    page = 1,
    limit = 10,
    search,
    status,
  }: {
    page?: number;
    limit?: number;
    search?: string;
    status?: SelectEvent["status"];
  }): Promise<Array<SelectEvent>> {
    const offset = (page - 1) * limit;

    return db.query.eventTable.findMany({
      where: and(
        search ? like(eventTable.name, `%${search}%`) : undefined,
        status ? eq(eventTable.status, status) : undefined,
      ),
      limit: limit,
      offset: offset,
    });
  }

  async findById(id: SelectEvent["id"]): Promise<SelectEvent | undefined> {
    return db.query.eventTable.findFirst({
      where: eq(eventTable.id, id),
    });
  }
  async update(
    id: string,
    data: Partial<Omit<SelectEvent, "id">>,
  ): Promise<void> {
    await db.update(eventTable).set(data).where(eq(eventTable.id, id));
  }

  async delete(id: string): Promise<void> {
    await db.delete(eventTable).where(eq(eventTable.id, id));
  }
}

type registerUsertoEventProps = {
  userId: string;
  eventId: string;
  driving: boolean;
  location: string;
};

export async function registerUserToEvent({
  userId,
  eventId,
  driving,
  location,
}: registerUsertoEventProps): Promise<void> {
  try {
    await db.insert(usersToEvents).values({
      user_id: userId,
      event_id: eventId,
      driving,
      location_id: location,
    });
  } catch (err) {
    console.error(err);
  }
}
