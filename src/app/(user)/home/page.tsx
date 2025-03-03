"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Page() {
  async function signOut() {
    await authClient.signOut()
  }
  return (
    <>
      Welcome!
      <Button onClick={signOut}>Sign Out</Button>
    </>
  )
}
