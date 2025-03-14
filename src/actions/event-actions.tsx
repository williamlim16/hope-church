"use server"

import { type SubmissionResult } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod"
import { eventCreate, eventDelete, eventPublish, eventUpdate } from "@/server/services/event-service";
import { redirect } from "next/navigation";

export async function addEditEventAction(prevState: SubmissionResult, formData: FormData) {
  const schema = z.object({
    eventId: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    event_date: z.date(),
    publish: z.string().optional(),
  }).refine((data) => data.eventId ?? (data.name && data.description, data.event_date), {
    message: "All fields are required for creation",
    path: ["name", "description", "event_date"],
  });

  const publishEventId = formData.get("publish") as string
  if (publishEventId) {
    await eventPublish({ eventId: publishEventId })
    redirect(`/admin/event/${publishEventId}/view`)
  }

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { eventId, name, description, event_date, publish } = submission.value;

  if (publish && eventId) {
    await eventPublish({ eventId })
    redirect(`/admin/event/${eventId}`)
  }

  if (eventId) {
    await eventUpdate({ id: eventId, name, description, event_date });
    redirect(`/admin/event/${eventId}`)
  } else {
    await eventCreate({ name, description, event_date });
    redirect(`/admin/event/`)
  }

}

export async function deleteEventAction(formData: FormData) {
  const schema = z.object({
    eventId: z.string()
  })

  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    throw new Error("Invalid event ID")
  }

  await eventDelete(submission.value.eventId)
  redirect(`/admin/event`)
}

export async function registerEventAction(formData: FormData) {
  const schema = z.object({
    eventId: z.string(),
    userId: z.string()
  })

  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    throw new Error("Invalid event or user")
  }
  const { userId, eventId } = submission.value

}
