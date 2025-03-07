import { AddEditForm } from "@/components/form/event-form"
import { Layout, LayoutHeader } from "@/components/layout/admin-add-edit-layout"
import { type NullishEvent } from "@/db/schema"
import { type NullishLifeGroup } from "@/db/schema/life-group"
import { eventById } from "@/server/services/event-service"
import { lifeGroupById } from "@/server/services/life-group-service"

export default async function Page({ params }: { params: Promise<{ slug: string | undefined }> }) {

  const parameters = await params
  let event: NullishEvent = undefined

  if (parameters?.slug && parameters.slug !== "add") {
    const eventId = parameters.slug
    event = await eventById(eventId)
  }

  return (
    <Layout>
      <LayoutHeader>
        {event ? "Edit Event" : "Add Event"}
      </LayoutHeader>
      <AddEditForm event={event ?? event} />
    </Layout>
  )
}
