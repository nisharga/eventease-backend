import httpStatus from 'http-status'
import BaseController from '../../shared/baseController'
import { EventService } from './event.service'
 

class Controller extends BaseController {
  createEvent = this.catchAsync(async (req, res, next) => {
    const payload = req.body
    const token = req?.headers?.authorization || ''
    const result = await EventService.createEvent(payload, token)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Create Event successfully !',
      data: result,
    })
  })

  getAllEvent = this.catchAsync(async (req, res, next) => { 
    const result = await EventService.getAllEvent()
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Event fetched successfully !', 
      data: result,
    })
  })

  updateEvent = this.catchAsync(async (req, res, next) => {
    const payload = req.body
    const id = req.params.id
    const result = await EventService.updateEvent(id, payload)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Event updated successfully !',
      data: result,
    })
  })

  getSingleEvent = this.catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await EventService.getSingleEvent(id)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' Fetched Single Event successfully !',
      data: result,
    })
  })

  deleteEvent = this.catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await EventService.deleteEvent(id)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Event deleted successfully !',
      data: result,
    })
  })
}

export const EventController = new Controller()
