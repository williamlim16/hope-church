"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {

  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  async function signOut() {
    setLoading(true)
    await authClient.signOut()
    router.push("/login")
    setLoading(false)
  }
  return (
    <>
      Welcome!
      <Button onClick={signOut} loading={isLoading}>Sign Out</Button>
    </>
  )
}
