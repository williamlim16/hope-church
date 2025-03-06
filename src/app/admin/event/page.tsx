
import { Layout, LayoutHeader } from "@/components/layout/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
export default async function Page() {

  return (
    <Layout>
      <LayoutHeader addUrl="/admin/event/add">Event</LayoutHeader>
    </Layout >
  )
}
