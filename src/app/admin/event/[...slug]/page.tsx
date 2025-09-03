import { AddEditForm } from "@/components/form/event-form";
import {
  Layout,
  LayoutHeader,
} from "@/components/layout/admin-add-edit-layout";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { type NullishEvent } from "@/db/schema";
import { eventById, eventParticipants } from "@/server/services/event-service";
import { columns } from "./participant-columns";
import { MapDisplay } from "./map-display";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string | string[] | undefined }>;
}) {
  const parameters = await params;
  let event: NullishEvent = undefined;
  let view = false;
  let participants = undefined;

  if (Array.isArray(parameters.slug)) {
    const [id, action] = parameters.slug;

    if (id && typeof id === "string" && id !== "add") {
      event = await eventById(id);

      participants = await eventParticipants(id);

      if (action === "view") {
        view = true;
      } else if (!action) {
        view = false;
      }
    }
  }

  return (
    <Layout>
      <LayoutHeader>
        {view ? "View Event" : event ? "Edit Event" : "Add Event"}
      </LayoutHeader>
      <AddEditForm event={event ?? event} view={view} />

      <Separator />
      <div className="pt-10">
        <LayoutHeader>Event Participant</LayoutHeader>
        {participants && <DataTable data={participants} columns={columns} />}
      </div>

      <Separator />
      <div className="h-[1000px] pt-10">
        <MapDisplay />
      </div>
    </Layout>
  );
}
