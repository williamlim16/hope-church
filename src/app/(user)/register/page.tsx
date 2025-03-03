import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import RegisterForm from "@/components/form/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">Enter your details below to create your account</CardDescription>
        </CardHeader>
        <RegisterForm />
      </Card>
    </div>
  )
}

