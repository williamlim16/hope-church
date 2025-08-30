import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/form/login-form";

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Welcome back!
          </CardDescription>
        </CardHeader>
        <LoginForm />
      </Card>
    </div>
  );
}
