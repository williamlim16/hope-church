import { LogoutButton } from "./logout-button";

export default async function Page() {

  return (
    <>
      <div className="min-h-screen flex justify-center bg-gray-50">
        <div className="w-full max-w-[430px] bg-white shadow-sm min-h-screen px-4 py-6">
          <div className="flex justify-end mb-2">
            <LogoutButton />
          </div>

          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Hope Events</h1>
            <p className="mt-1 text-sm text-muted-foreground"></p>
          </div>
        </div>
      </div>
    </>
  )
}

