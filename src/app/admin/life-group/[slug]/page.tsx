import { AddEditForm } from "@/components/form/life-group-form"
import { Layout, LayoutHeader } from "@/components/layout/admin-add-edit-layout"
import { type NullishLifeGroup } from "@/db/schema/life-group"
import { lifeGroupById } from "@/server/services/life-group-service"

export default async function Page({ params }: { params: Promise<{ slug: string | undefined }> }) {

  const parameters = await params
  let lifeGroup: NullishLifeGroup = undefined

  if (parameters?.slug && parameters.slug !== "add") {
    const lifeGroupId = parameters.slug
    lifeGroup = await lifeGroupById(lifeGroupId)
  }

  return (
    <Layout>
      <LayoutHeader>
        {lifeGroup ? "Edit Life Group" : "Add Life Group"}
      </LayoutHeader>
      <AddEditForm lifeGroup={lifeGroup ?? lifeGroup} />
    </Layout>
  )
}
