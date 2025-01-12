import prisma from "../../../prisma-client/prisma";

export const decreaseEventAttendee = async (eventId: string) => {
    const event = await prisma.event.findUnique({
        where: { id: eventId },
      });
  
      if (!event) {
        throw new Error("Event not found!");
      }
  
      if (event.maxAttendees <= 0) {
        throw new Error("No seats available!");
      }
  
      // Decrease maxAttendees count
      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: { maxAttendees: event.maxAttendees - 1 },
      });

      return updatedEvent;
}