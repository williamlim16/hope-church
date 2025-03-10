"use client"

import { Button } from "../ui/button"
import { FormContainer, FormDate, FormInput } from "./form-input"
import { z } from "zod"
import { useActionState } from "react"
import { useForm, type SubmissionResult } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { type NullishEvent } from "@/db/schema"
import Link from "next/link"
import { Input } from "../ui/input"
import { addEditEventAction } from "@/actions/event-actions"
import { useFormStatus } from "react-dom"

type Props = {
  event: NullishEvent
  view: boolean
}

export function AddEditForm({ event = undefined, view = false }: Props) {

  const { pending } = useFormStatus()

  const addSchema = z.object({
    name: z.string({ message: "Name is required" }),
    description: z.string({ message: "Description is required" }),
    event_date: z.date({ message: "Date is required" }),
  })

  const editSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    event_date: z.date().optional(),
  })

  const [lastResult, action] = useActionState<SubmissionResult, FormData>(addEditEventAction, {})

  const [form, fields] = useForm({
    lastResult,
    defaultValue: {
      name: event?.name,
      description: event?.description,
      event_date: event?.event_date,
    },
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: event ? editSchema : addSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })


  return (
    <form action={action}
      onSubmit={form.onSubmit}
      noValidate id={form.id}>
      <FormContainer>
        <FormInput
          label="Event name"
          description="Name for your event"
          errors={fields.name.errors}
          inputProps={{
            defaultValue: fields.name.initialValue,
            id: fields.name.id,
            name: fields.name.name,
            disabled: view
          }}
        />

        <FormInput
          label="Description"
          description="Describe your event"
          errors={fields.description.errors}
          inputProps={{
            defaultValue: fields.description.initialValue,
            id: fields.description.id,
            name: fields.description.name,
            disabled: view
          }}
        />

        <FormDate
          label="Event date"
          description="When the event is going to happen"
          errors={fields.event_date.errors}
          inputProps={{
            defaultValue: fields.event_date.initialValue?.split('.')[0],
            id: fields.event_date.id,
            name: fields.event_date.name,
            disabled: view
          }}
        />

        {event ?
          <Input type="hidden" value={event.id} name="eventId" /> : null
        }

        <div className="col-start-4 flex gap-3 justify-end">
          <Link href="/admin/event">
            <Button variant="outline">Cancel </Button>
          </Link>
          {!view ?
            <Button type="submit" disabled={pending} >Submit</Button> : null
          }
          {view && event ?
            <Link href={`/admin/event/${event.id}`}>
              <Button variant="outline">Edit </Button>
            </Link> : null
          }
          {view && event ?
            <div>
              <Input type="hidden" name="publish" value={event.id} />
              <Button type="submit" variant="publish" disabled={pending}>Publish</Button>
            </div> : null
          }
        </div>
      </FormContainer>
    </form>
  )
}
