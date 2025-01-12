import express from 'express' 
import { Role } from '@prisma/client'
import validateRequest from '../../middlewares/validateRequest' 
import verifyToken from '../../middlewares/verifyToken'
import validateAuthorization from '../../middlewares/validateAuthorization' 
import { AttendeeValidation } from './attendee.validation'
import { AttendeeController } from './attendee.controller'
 
  
const router = express.Router()

router.post(
  '/',
  validateRequest(AttendeeValidation.AttendeeValidationSchema),
  verifyToken,
  validateAuthorization([Role.ATTENDEE]),
  AttendeeController.createAttendee,
)

router.get(
  '/',
  verifyToken,
  validateAuthorization([Role.USER, Role.ATTENDEE]),
  AttendeeController.getAllAttendee,
)
router.patch(
  '/:id',
  verifyToken,
  validateAuthorization([Role.ATTENDEE]),
  AttendeeController.updateAttendee,
)
router.get(
  '/:id',
  verifyToken,
  validateAuthorization([Role.USER, Role.ATTENDEE]),
  AttendeeController.getSingleAttendee,
)
router.delete(
  '/:id',
  verifyToken,
  validateAuthorization([Role.USER, Role.ATTENDEE]),
  AttendeeController.deleteAttendee,
)

export const AttendeeRoutes = router
