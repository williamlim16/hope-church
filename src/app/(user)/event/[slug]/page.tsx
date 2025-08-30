import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/server/lib/auth";
import { eventById } from "@/server/services/event-service";
import { ArrowLeft, Calendar } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function EventDetailView({ params }: { params: Promise<{ slug: string }> }) {
  const parameters = await params
  if (!parameters.slug) {
    redirect('/home')
  }
  const event = await eventById(parameters.slug)

  if (!event) {
    redirect('/home')
  }
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="pb-20">
      <Link href={"/home"}>
        <Button variant="ghost" className="mb-4 pl-0" >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Button>
      </Link>

      {/* Event Image */}
      <div className="w-full aspect-[3/2] overflow-hidden rounded-lg mb-6">
        <img src={"https://dbjzmawememiz.cloudfront.net/event/default-event.jpg"} alt={event?.name} className="w-full h-full object-cover" />
      </div>

      {/* Event Title and Category */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{event.name}</h1>
        {/*<p className="text-muted-foreground">{event.}</p>*/}
      </div>

      {/* Event Details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-3">
          <Calendar className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Date & Time</h3>
            <p className="text-sm text-muted-foreground">
              {event.event_date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })}
            </p>
            <p className="text-sm text-muted-foreground">{event.event_date.toLocaleTimeString()}</p>
          </div>
        </div>

        {/*
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Location</h3>
            <p className="text-sm text-muted-foreground">{event.location}</p>
          </div>
        </div>
        */}

        {/*
        <div className="flex items-start gap-3">
          <Tag className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h3 className="font-medium">Attendees</h3>
            <p className="text-sm text-muted-foreground">{event.attendees.toLocaleString()} people attending</p>
          </div>
        </div>
      </div>
      */}

        {/* Event Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">About This Event</h2>
          <p className="text-sm leading-relaxed">{event.description}</p>
        </div>

        {/* Sticky Register Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t max-w-[430px] mx-auto">
          <form className="w-full">
            <Input type="hidden" name="eventId" value={event.id} />
            <Input type="hidden" name="userId" value={session.user.id} />
            <Input type="hidden" name="driving" value={session.user.id} />
            <Input type="hidden" name="location" value={session.user.id} />
            <Button className="w-full" size="lg" type="submit">
              Register Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
