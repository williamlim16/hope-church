import { EventCard } from "@/components/ui/event-card";
import { eventPublishedList } from "@/server/services/event-service";

export default async function Page() {

  const events = await eventPublishedList()

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hope Events</h1>
        <p className="mt-1 text-sm text-muted-foreground"></p>
      </div>

      {events?.map((event) =>
        (<EventCard event={event} key={event.id} />)
      )}
    </>
  )
}

