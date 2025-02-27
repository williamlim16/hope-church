"use server"

import { type SubmissionResult } from "@conform-to/react";
import { z } from "zod";
import { parseWithZod } from "@conform-to/zod"
import { lifeGroupCreate, lifeGroupUpdate } from "@/server/services/life-group-service";

export async function addEditLifeGroup(prevState: SubmissionResult, formData: FormData) {
  const schema = z.object({
    lifeGroupId: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    voucher: z.string().min(1, "Voucher is required"),
  }).refine((data) => data.lifeGroupId ?? (data.name && data.voucher), {
    message: "Name and Voucher are required for creation",
    path: ["name", "voucher"],
  });

  const submission = parseWithZod(formData, { schema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { lifeGroupId, name, voucher } = submission.value;

  if (lifeGroupId) {
    await lifeGroupUpdate({ id: lifeGroupId, name, voucher });
  } else {
    await lifeGroupCreate({ name, voucher });
  }
  return submission.reply();

}
