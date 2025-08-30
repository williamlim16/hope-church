import { Home } from "lucide-react";
import { LogoutButton } from "./home/logout-button";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex min-h-screen justify-center bg-gray-50">
        <div className="w-full max-w-[430px] bg-white px-4 py-6 shadow-sm">
          <div className="mb-2 flex items-center">
            <Link href="/home">
              <Home className="h-5 w-5" />
            </Link>
            <div className="ml-auto">
              <LogoutButton />
            </div>
          </div>
          <div className="pt-10">{children}</div>
        </div>
      </div>
    </>
  );
}
