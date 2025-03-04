"use server"
import { auth } from "@/server/lib/auth"
import { getLifeGroupByVoucher } from "../repository/life-group-repository"
import { updateUserLifeGroup } from "../repository/user-repository"
import { APIError } from "better-auth/api"

export async function signUpUser({ name, email, password, voucher }: { name: string, email: string, password: string, voucher: string }) {

  const lifeGroupId = await getLifeGroupByVoucher(voucher)

  if (!lifeGroupId) {
    throw Error("Life group voucher is invalid")
  }

  try {
    const user = await auth.api.signUpEmail({
      body: {
        name, email, password
      }
    })

    if (!user) {
      throw Error("Something went wrong when creating the user")
    }
    await updateUserLifeGroup(user.user.id, lifeGroupId)
  } catch (error) {
    if (error instanceof APIError) {
      console.log(error.message, error.status)
    }
  }

}

export async function signInUser({ email, password }: { email: string, password: string }) {

  const user = await auth.api.signInEmail({
    body: {
      email, password
    }
  })

  if (!user) {
    throw Error("Something went wrong when logging in ")
  }

}
