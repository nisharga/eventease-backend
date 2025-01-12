import { Event } from '@prisma/client'
import { decodeToken } from '../../helpers'
import prisma from '../../../prisma-client/prisma'
import ApiError from '../../middlewares/apiError'
import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
 

class Service {
  async createEvent(payload: Event, token: string) { 
    const { email } = decodeToken(token); 
    const result = await prisma.event.create({
        data: {
            ...payload, // Spread the existing payload data
            organizerEmail: email, // Override or add the organizerEmail field
          },
        }); 
    return result;
  }

  async getAllEvent() {
    const events = await prisma.event.findMany();
    return {
      success: true,
      data: events,
    };
  }
  

  async updateEvent(id: string, payload: Partial<Event>) {
    await prisma.event.findUniqueOrThrow({
      where: {
        id,
      },
    })
    const result = await prisma.event.update({
      where: {
        id,
      },
      data: payload,
    })
    return result
  }

  async getSingleEvent(id: string) {
    try {
      const Event = await prisma.event.findUniqueOrThrow({
        where: {
          id,
        },
      })
      return Event
    } catch (error) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Event Not Found or server issue',
      )
    }
  }

  async deleteEvent(id: string) {
    try {
      const result = await prisma.event.delete({
        where: {
          id,
        },
      })
      return result
    } catch (error) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'Event not found or server issue',
      )
    }
  }
}

export const EventService = new Service()
