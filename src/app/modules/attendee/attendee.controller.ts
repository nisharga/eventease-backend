import httpStatus from 'http-status'
import BaseController from '../../shared/baseController' 
import { AttendeeService } from './attendee.service'
 

class Controller extends BaseController {
  createAttendee = this.catchAsync(async (req, res, next) => {
    const payload = req.body
    const token = req?.headers?.authorization || ''
    const result = await AttendeeService.createAttendee(payload, token)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Create Attendee successfully !',
      data: result,
    })
  })

  getAllAttendee = this.catchAsync(async (req, res, next) => { 
    const result = await AttendeeService.getAllAttendee()
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All Attendee fetched successfully !', 
      data: result,
    })
  })

  updateAttendee = this.catchAsync(async (req, res, next) => {
    const payload = req.body
    const id = req.params.id
    const result = await AttendeeService.updateAttendee(id, payload)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Attendee updated successfully !',
      data: result,
    })
  })

  getSingleAttendee = this.catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await AttendeeService.getSingleAttendee(id)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: ' Fetched Single Attendee successfully !',
      data: result,
    })
  })

  deleteAttendee = this.catchAsync(async (req, res, next) => {
    const id = req.params.id
    const result = await AttendeeService.deleteAttendee(id)
    this.sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Attendee deleted successfully !',
      data: result,
    })
  })
}

export const AttendeeController = new Controller()
