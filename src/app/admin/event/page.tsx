
import { Layout, LayoutHeader } from "@/components/layout/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { eventList } from "@/server/services/event-service"
export default async function Page() {

  const event = await eventList()

  return (
    <Layout>
      <LayoutHeader addUrl="/admin/event/add">Event</LayoutHeader>
      <DataTable data={event} columns={columns} />
    </Layout >
  )
}
