"use server";

import { type SelectEvent, type SelectUser } from "@/db/schema";
import {
  EventRepository,
  registerUserToEvent,
} from "../repository/event-repository";

export async function eventList() {
  const eventRepository = new EventRepository();
  return await eventRepository.findMany({});
}

export async function eventById(id: string) {
  const eventRepository = new EventRepository();
  return await eventRepository.findById(id);
}

export async function eventCreate({
  name,
  description,
  event_date,
}: {
  name: string;
  description: string;
  event_date: Date;
}) {
  const eventRepository = new EventRepository();
  await eventRepository.save({
    name,
    description,
    event_date,
  });
}

export async function eventUpdate({
  id,
  name,
  description,
  event_date,
}: {
  id: string;
  name: string | undefined;
  description: string | undefined;
  event_date: Date | undefined;
}) {
  const eventRepository = new EventRepository();
  await eventRepository.update(id, { name, description, event_date });
}

export async function eventDelete(id: string) {
  const eventRepository = new EventRepository();
  await eventRepository.delete(id);
}

export async function eventPublish({ eventId }: { eventId: string }) {
  const eventRepository = new EventRepository();
  await eventRepository.update(eventId, {
    status: "published",
  });
}

export async function eventPublishedList() {
  const eventRepository = new EventRepository();
  return await eventRepository.findMany({ status: "published" });
}

export async function attendEvent(
  eventId: SelectEvent["id"],
  userId: SelectUser["id"],
  location: string,
  driving: boolean,
) {
  try {
    await registerUserToEvent({
      eventId,
      userId,
      location,
      driving,
    });
  } catch (err) {
    console.error(err);
  }
}

export async function eventParticipants(id: SelectEvent["id"]) {
  const eventRepository = new EventRepository();
  return await eventRepository.findParticipants(id);
}
