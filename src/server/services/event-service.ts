"use server"

import { createEvent, deleteEvent, getEventById, getEvents, updateEvent } from "../repository/event-repository"

export async function eventList() {
  return await getEvents()
}

export async function eventById(id: string) {
  return await getEventById(id)
}

export async function eventCreate({ name, description, event_date }: { name: string, description: string, event_date: Date }) {
  await createEvent({
    name,
    description,
    event_date
  })
}

export async function eventUpdate({ id, name, description, event_date }: { id: string, name: string | undefined, description: string | undefined, event_date: Date | undefined }) {
  await updateEvent(id, {
    name, description, event_date
  })
}

export async function eventDelete(id: string) {
  await deleteEvent(id)
}


