"use client"

import { addEditLifeGroup } from "@/actions/life-group-actions"
import { Button } from "../ui/button"
import { FormContainer, FormInput } from "./form-input"
import { z } from "zod"
import { useActionState } from "react"
import { useForm, type SubmissionResult } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { type NullishLifeGroup } from "@/db/schema"
import Link from "next/link"

type Props = {
  lifeGroup: NullishLifeGroup
}

export function AddEditForm({ lifeGroup = undefined }: Props) {

  const addSchema = z.object({
    name: z.string({ message: "Name is required" }),
    voucher: z.string({ message: "Voucher is required" }),
  })

  const editSchema = z.object({
    name: z.string().optional(),
    voucher: z.string().optional(),
  })

  const [lastResult, action] = useActionState<SubmissionResult, FormData>(addEditLifeGroup, {})

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: lifeGroup ? editSchema : addSchema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  })

  return (
    <form action={action} onSubmit={form.onSubmit} noValidate id={form.id}>
      {JSON.stringify(lifeGroup)}
      <FormContainer>
        <FormInput
          label="Life group name"
          description="Name for your life group"
          errors={fields.name.errors}
          inputProps={{
            defaultValue: fields.name.initialValue,
            id: fields.name.id,
            name: fields.name.name
          }}
        />

        <FormInput
          label="Voucher"
          description="Voucher for life group members to sign up"
          errors={fields.voucher.errors}
          inputProps={{
            defaultValue: fields.voucher.initialValue,
            id: fields.voucher.id,
            name: fields.voucher.name
          }}
        />

        <Link href="/admin/life-group" className="col-start-3 w-full">
          <Button className="w-full">Cancel</Button>
        </Link>
        <Button type="submit" className="col-start-4">Submit</Button>
      </FormContainer>
    </form>

  )
}
