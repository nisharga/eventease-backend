import express from 'express' 
import { Role } from '@prisma/client'
import validateRequest from '../../middlewares/validateRequest'
import { EventValidations } from './event.validation'
import verifyToken from '../../middlewares/verifyToken'
import validateAuthorization from '../../middlewares/validateAuthorization'
import { EventController } from './event.controller'
  
const router = express.Router()

router.post(
  '/',
  validateRequest(EventValidations.eventValidationSchema),
  verifyToken,
  validateAuthorization([Role.USER]),
  EventController.createEvent,
)

router.get(
  '/',
  verifyToken,
  validateAuthorization([Role.USER, Role.ATTENDEE]),
  EventController.getAllEvent,
)
router.patch(
  '/:id',
  verifyToken,
  validateAuthorization([Role.USER]),
  EventController.updateEvent,
)
router.get(
  '/:id',
  verifyToken,
  validateAuthorization([Role.USER, Role.ATTENDEE]),
  EventController.getSingleEvent,
)
router.delete(
  '/:id',
  verifyToken,
  validateAuthorization([Role.USER]),
  EventController.deleteEvent,
)

export const EventRoutes = router
