
import { Layout, LayoutHeader } from "@/components/layout/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { eventPublishedList } from "@/server/services/event-service"
export default async function Page() {

  const event = await eventPublishedList()

  return (
    <Layout>
      <LayoutHeader addUrl="/admin/event/add">Event</LayoutHeader>
      <DataTable data={event} columns={columns} />
    </Layout >
  )
}
