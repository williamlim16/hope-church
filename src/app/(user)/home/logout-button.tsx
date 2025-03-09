"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LogoutButton() {

  const [isLoading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  async function signOut() {
    setLoading(true)
    await authClient.signOut()
    router.push("/login")
    setLoading(false)
  }
  return (

    <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={signOut} disabled={isLoading}>
      <LogOut className="h-4 w-4" />
      <span>Sign Out</span>
    </Button>
  )

}
