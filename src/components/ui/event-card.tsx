import { type SelectEvent } from "@/db/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

type EventCardProps = {
  event: SelectEvent
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden mb-4">
      <div className="aspect-video w-full overflow-hidden">
        <img src={"https://dbjzmawememiz.cloudfront.net/event/default-event.jpg"} alt={event.name} className="h-full w-full object-cover" />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-xl">{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-sm">
          <Calendar className="h-4 w-4" />
          {event.event_date.toLocaleString("en-US", { timeZone: "Australia/Sydney", day: "numeric", month: "long", year: "numeric" })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{event.event_date.toLocaleTimeString()}</span>
        </div>
        <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
        </div>
        <p className="line-clamp-2 text-sm">{event.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/event/${event.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
