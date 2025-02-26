"use server"

import { type SubmissionResult } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod"
import { lifeGroupCreate } from "@/server/services/life-group-service";

export async function addEditLifeGroup(prevState: SubmissionResult, formData: FormData) {
  const addSchema = z.object({
    name: z.string(),
    voucher: z.string()
  })

  const submission = parseWithZod(formData, { schema: addSchema })

  if (submission.status !== "success") {
    return submission.reply()
  }

  await lifeGroupCreate({
    name: submission.value.name,
    voucher: submission.value.voucher
  })
  return submission.reply()

}
