import { Layout, LayoutHeader } from "@/components/layout/admin-layout"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { lifeGroupList } from "@/server/services/life-group-service"
export default async function Page() {
  const lifeGroup = await lifeGroupList()

  return (
    <Layout>
      <LayoutHeader addUrl="/admin/life-group/add">Life Group</LayoutHeader>
      <DataTable columns={columns} data={lifeGroup} />
    </Layout >
  )
}
