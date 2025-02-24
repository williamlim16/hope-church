"use server"

import { createLifeGroup, deleteLifeGroup, getLifeGroups, updateLifeGroup } from "../repository/life-group-repository"

export async function lifeGroupList() {
  return await getLifeGroups()
}

export async function lifeGroupCreate({ name, voucher }: { name: string, voucher: string }) {
  await createLifeGroup({
    name,
    voucher
  })
}

export async function lifeGroupUpdate({ id, name, voucher }: { id: string, name: string | undefined, voucher: string | undefined }) {
  await updateLifeGroup(id, {
    name, voucher
  })
}

export async function lifeGroupDelete(id: string) {
  await deleteLifeGroup(id)
}


