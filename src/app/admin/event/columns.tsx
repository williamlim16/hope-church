"use client"

import { type SelectEvent } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteEventAction } from "@/actions/event-actions";

export const columns: ColumnDef<SelectEvent>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "event_date",
    header: "Date",
    cell: ({ row }) => {
      const created = row.getValue("event_date")
      const date = new Date(created as Date)
      return date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })
    }

  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const created = row.getValue("created_at")
      const date = new Date(created as Date)
      return date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const event = row.original
      if (event.status === "draft") {
        return (
          <Badge variant={"draft"}>Draft</Badge>
        )
      } else {
        return (
          <Badge variant={"published"}>Published</Badge>
        )
      }
    }
  }, {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original
      return (
        <div className="flex gap-3">
          {event.status !== "published" &&
            <Link href={`/admin/event/${event.id}`}>
              <Button variant="ghost" size="sm">
                <Pencil />
              </Button>
            </Link>
          }

          <Link href={`/admin/event/${event.id}/view`}>
            <Button variant="ghost" size="sm">
              <Eye />
            </Button>
          </Link>

          {event.status === "draft" ?
            <DeleteDialog event={event} /> : null
          }
        </div>
      )
    }
  }
]

function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <Button variant="destructive" disabled={pending}>
      Delete
    </Button>
  )
}

function DeleteDialog({ event }: { event: SelectEvent }) {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this event.
          </DialogDescription>
          <DialogFooter >
            <form action={deleteEventAction}>
              <Input type="hidden" value={event.id} name="eventId" />
              <DeleteButton />
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}


