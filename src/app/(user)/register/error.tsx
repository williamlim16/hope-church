"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center text-destructive">
            <AlertCircle className="mr-2" size={24} />
            Error
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-4">{error.message || "Something went wrong. Please try again."}</p>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button onClick={reset} className="w-full h-12 text-base">
            Try again
          </Button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Return to{" "}
            <Link href="/" className="text-primary underline underline-offset-4 hover:text-primary/90">
              home page
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

