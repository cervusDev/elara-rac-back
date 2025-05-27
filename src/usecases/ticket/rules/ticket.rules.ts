import { Ticket } from "../entity/ticket.entity";
import { Event } from "../../events/entity/event.entity";

export function limitTicketsByCpf(tickets: Ticket[]) {
  if (tickets.length >= 3) {
    return false;
  };

  return true;
};

export function limitTickesToSold(tickes: Ticket[], event: Event) {
  const numberOfTicketsSold = tickes.length - 1;

  if (numberOfTicketsSold >= event.maxParticipants) {
    return false;
  };

  return true;
};

export function eventTimeout(event: Event) {
  const now = new Date();
  const eventDate = new Date(`${event.date}T${event.time}`);

  return eventDate > now;
}