import { FormContainer, FormInput } from "@/components/form/form-input"
import { Layout, LayoutHeader } from "@/components/layout/admin-add-edit-layout"
import { Button } from "@/components/ui/button"
import { type NullishLifeGroup } from "@/db/schema/life-group"
import { lifeGroupById } from "@/server/services/life-group-service"

export default async function Page({ params }: { params: Promise<{ slug: string | undefined }> }) {

  const parameters = await params
  let lifeGroup: NullishLifeGroup

  if (parameters?.slug && parseInt(parameters.slug)) {
    const lifeGroupId = parameters.slug
    lifeGroup = await lifeGroupById(lifeGroupId)
  }

  return (
    <Layout>
      <LayoutHeader>
        {lifeGroup ? "Editting Life Group" : "Adding Life Group"}
      </LayoutHeader>

      <form>
        <FormContainer>
          <FormInput
            label="Life group name"
            description="Name for your life group"
            errors={undefined} />

          <FormInput
            label="Voucher"
            description="Voucher for life group members to sign up"
            errors={undefined} />

          <Button type="submit" className="col-start-3">Cancel</Button>
          <Button type="submit" className="col-start-4">Submit</Button>
        </FormContainer>
      </form>
    </Layout>
  )
}
