"use client"

import { type SelectEvent } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

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
          <Badge>Draft</Badge>
        )
      } else {
        return (
          <Badge>Published</Badge>
        )
      }
    }
  },
]


