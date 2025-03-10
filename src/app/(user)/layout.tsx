import { Home } from "lucide-react";
import { LogoutButton } from "./home/logout-button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-50">
        <div className="w-full max-w-[430px] bg-white shadow-sm min-h-screen px-4 py-6">
          <div className="flex  mb-2 items-center">
            <Link href="/home">
              <Home className="h-5 w-5" />
            </Link>
            <div className="ml-auto">
              <LogoutButton />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}
