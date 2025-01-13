import { Attendee } from '@prisma/client'
import { decodeToken } from '../../helpers'
import prisma from '../../../prisma-client/prisma'
import ApiError from '../../middlewares/apiError'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { decreaseEventAttendee } from './attendee.utlis'
import { io } from '../../../server'
 

class Service {
  async createAttendee(payload: Attendee, token: string) {
    const { email } = decodeToken(token);
  
    // Start a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the event details to check maxAttendees and populate response
      const updatedEvent = await decreaseEventAttendee(payload.eventId);
  
      // Create the attendee
      const attendee = await prisma.attendee.create({
        data: {
          ...payload,
          attendeeEmail: email,
        }
      });
 
  
      // Fetch the event name from the event details
      const AttendeeSingle = await prisma.event.findUniqueOrThrow({
        where: {
          id: payload.eventId,
        },
      });
  
      const eventName = AttendeeSingle?.name;
  
      // Emit event to notify about the new attendee
      io.emit("new-attendee-request", {
        attendee,
        eventName: eventName
      });
  
      // If maxAttendees reaches 0, notify that the event is full
      if (updatedEvent.maxAttendees === 0) {
        io.emit("event-full", {
          eventId: payload.eventId,
          message: `${eventName} event has reached its maximum capacity!`,
        });
      }
  
      // Return the attendee and updated event details
      return {
        attendee,
        event: updatedEvent, // Use the updated event
        eventName,
      };
    });
  
    return result;
  }
  
   
  async getAllAttendee() {
    const Attendees = await prisma.attendee.findMany();
    return {
      success: true,
      data: Attendees,
    };
  }
  

  async updateAttendee(id: string, payload: Partial<Attendee>) {
    await prisma.attendee.findUniqueOrThrow({
      where: {
        id,
      },
    })
    const result = await prisma.attendee.update({
      where: {
        id,
      },
      data: payload,
    })
    // Emit event to notify attendees about updates
    io.emit("event-updated", {
      result,
    });
    return result
  }

  async getSingleAttendee(id: string) {
    try {
      const Attendee = await prisma.attendee.findUniqueOrThrow({
        where: {
          id,
        },
      })
      return Attendee
    } catch (error) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Attendee Not Found or server issue',
      )
    }
  }

  async deleteAttendee(id: string) {
    try {
      const result = await prisma.attendee.delete({
        where: {
          id,
        },
      })
      return result
    } catch (error) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Attendee not found or server issue',
      )
    }
  }
}

export const AttendeeService = new Service()
