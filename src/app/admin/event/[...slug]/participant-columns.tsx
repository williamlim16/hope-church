"use client";

import { type SelectUser } from "@/db/schema";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { deleteEventAction } from "@/actions/event-actions";
import { Badge } from "@/components/ui/badge";

type Participants = {
  user_name: string;
  user_id: string;
  life_group: string;
  location: string;
  driving: boolean;
};
export const columns: ColumnDef<Participants>[] = [
  {
    accessorKey: "user_name",
    header: "User Name",
  },

  {
    accessorKey: "life_group",
    header: "Life Group",
  },

  {
    accessorKey: "location",
    header: "Location",
  },

  {
    accessorKey: "driving",
    header: "Driving",

    cell: ({ row }) => {
      const participant = row.original;
      if (participant.driving) {
        return <Badge variant={"draft"}>Yes</Badge>;
      } else {
        return <Badge variant={"destructive"}>No</Badge>;
      }
    },
  },
];

function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" disabled={pending}>
      Delete
    </Button>
  );
}

function DeleteDialog({ event }: { event: SelectUser }) {
  const [open, setOpen] = useState(false);

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
            This action cannot be undone. This will permanently delete this
            event.
          </DialogDescription>
          <DialogFooter>
            <form action={deleteEventAction}>
              <Input type="hidden" value={event.id} name="eventId" />
              <DeleteButton />
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
