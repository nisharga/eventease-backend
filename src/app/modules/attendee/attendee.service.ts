import { Attendee } from '@prisma/client'
import { decodeToken } from '../../helpers'
import prisma from '../../../prisma-client/prisma'
import ApiError from '../../middlewares/apiError'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
 

class Service {
  async createAttendee(payload: Attendee, token: string) {
    const { email } = decodeToken(token);
  
    // Start a transaction to ensure atomicity
    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the event details to check maxAttendees and populate response
      const event = await prisma.event.findUnique({
        where: { id: payload.eventId },
      });
  
      if (!event) {
        throw new Error("Event not found!");
      }
  
      if (event.maxAttendees <= 0) {
        throw new Error("No seats available!");
      }
  
      // Decrease maxAttendees count
      const updatedEvent = await prisma.event.update({
        where: { id: payload.eventId },
        data: { maxAttendees: event.maxAttendees - 1 },
      });
  
      // Create the attendee
      const attendee = await prisma.attendee.create({
        data: {
          ...payload,
          attendeeEmail: email,
        },
      });
  
      // Return the attendee and updated event details
      return {
        attendee,
        event: updatedEvent, // Use the updated event
      };
    });
  
    return result
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
