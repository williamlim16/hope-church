"use client"

import { loginUser } from "@/actions/auth-actions"
import { Button } from "../ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { useForm, type SubmissionResult } from "@conform-to/react"
import { useActionState, useEffect } from "react"
import { parseWithZod } from "@conform-to/zod"
import { z } from "zod"
import Link from "next/link"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/router"

export default function LoginForm() {

  const schema = z.object({
    email: z.string({ message: "Email is required" }),
    password: z.string({ message: "Password is required" }),
  })

  const [lastResult, action, isPending] = useActionState<SubmissionResult, FormData>(loginUser, {})

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema })
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'

  })

  return (
    <form
      action={action}
      onSubmit={form.onSubmit}
      noValidate
      id={form.id}
    >
      <CardContent className="space-y-4">
        <FormInput
          label="Email"
          description="Enter your preferred email"
          errors={fields.email.errors}
          inputProps={{
            id: fields.email.id,
            name: fields.email.name
          }}
        />
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" name="password" />
          <p className="text-xs text-red-400">{fields.password.errors}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full h-12 text-base" type="submit" loading={isPending}>
          Login
        </Button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary underline underline-offset-4 hover:text-primary/90">
            Sign Up
          </Link>
        </p>
      </CardFooter>
    </form >
  )
}

type FormInputProps = {
  label: string,
  description: string,
  errors: string[] | undefined
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

function FormInput({ label, inputProps, errors }: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        {...inputProps}
      />

      <p className="text-xs text-red-400">{errors}</p>
    </div>
  )
}
