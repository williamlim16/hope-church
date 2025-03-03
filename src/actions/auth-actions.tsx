"use server"

import { z } from "zod"
import { type SubmissionResult } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { signInUser, signUpUser } from "@/server/services/auth-service"

export async function registerUser(prevState: SubmissionResult, formData: FormData) {

  const schema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    voucher: z.string(),
  })

  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    return submission.reply()
  }
  const { name, email, password, voucher } = submission.value

  await signUpUser({ name, email, password, voucher })
  return submission.reply()
}

export async function loginUser(prevState: SubmissionResult, formData: FormData) {

  const schema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const submission = parseWithZod(formData, { schema })

  if (submission.status !== "success") {
    return submission.reply()
  }
  const { email, password } = submission.value
  await signInUser({ email, password })

  return submission.reply()
}

