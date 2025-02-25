import express from 'express' 
import { authRoutes } from '../modules/auth/auth.route'
import { EventRoutes } from '../modules/event'
import { AttendeeRoutes } from '../modules/attendee'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  }, 
  {
    path: '/event',
    route: EventRoutes,
  }, {
    path: '/attendee-registration',
    route: AttendeeRoutes,
  }, 
]

moduleRoutes.forEach(({ path, route }) => router.use(path, route))

export default router
