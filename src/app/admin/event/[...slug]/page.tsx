import { AddEditForm } from "@/components/form/event-form"
import { Layout, LayoutHeader } from "@/components/layout/admin-add-edit-layout"
import { type NullishEvent } from "@/db/schema"
import { eventById } from "@/server/services/event-service"

export default async function Page({ params }: { params: Promise<{ slug: string | string[] | undefined }> }) {

  const parameters = await params
  let event: NullishEvent = undefined
  let view = false

  if (Array.isArray(parameters.slug)) {
    const [id, action] = parameters.slug;

    if (id && typeof id === "string" && id !== "add") {
      event = await eventById(id);

      if (action === "view") {
        view = true
      } else if (!action) {
        view = false
      }
    }
  }


  return (
    <Layout>
      <LayoutHeader>
        {view ? "View Event" : event ? "Edit Event" : "Add Event"}
      </LayoutHeader>
      <AddEditForm event={event ?? event} view={view} />
    </Layout>
  )
}
