"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type SelectLifeGroup } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<SelectLifeGroup>[] = [
  {
    accessorKey: "name",
    header: "Name"
  },
  {
    accessorKey: "voucher",
    header: "Voucher"
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
    accessorKey: "updated_at",
    header: "Updated At",
    cell: ({ row }) => {
      const created = row.getValue("updated_at")
      if (!created) {
        return
      }
      const date = new Date(created as Date)
      return date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lifeGroup = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lifeGroup.voucher)}
            >
              Copy Voucher
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      )
    }
  }
]
