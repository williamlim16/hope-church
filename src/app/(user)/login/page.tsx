import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/form/login-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center">Welcome back!</CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  )
}

