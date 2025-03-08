"use client"

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { type SelectLifeGroup } from "@/db/schema"
import { type ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { deleteLifeGroup } from "@/actions/life-group-actions";
import { useFormStatus } from "react-dom";
import { useState } from "react";

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
      const updated = row.getValue("updated_at")
      if (!updated) {
        return
      }
      const date = new Date(updated as Date)
      return date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lifeGroup = row.original


      return (
        <div className="flex gap-3">

          <Link href={`/admin/life-group/${lifeGroup.id}`}>
            <Button variant="ghost" size="sm">
              <Pencil />
            </Button>
          </Link>

          <DeleteDialog lifeGroup={lifeGroup} />

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
            </DropdownMenuContent>
          </DropdownMenu>
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

function DeleteDialog({ lifeGroup }: { lifeGroup: SelectLifeGroup }) {

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
            This action cannot be undone. This will permanently delete this life group.
          </DialogDescription>
          <DialogFooter >
            <form action={deleteLifeGroup}>
              <Input type="hidden" value={lifeGroup.id} name="lifeGroupId" />
              <DeleteButton />
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
