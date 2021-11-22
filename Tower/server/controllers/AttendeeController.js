import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeeService } from '../services/AttendeeService'
import BaseController from '../utils/BaseController'

export class AttendeeController extends BaseController {
  constructor() {
    super('/api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/attendees', this.attendEvent)
      .delete('/:attendeeId', this.removeAttendee)
      .get('/attendees', this.getAttendance)
      .get('/events/:eventId/attendees', this.getEventAttendance)
  }

  // NOTE Capacity not updating
  async attendEvent(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const attended = await attendeeService.attendEvent(req.body)
      return res.send(attended)
    } catch (error) {
      next(error)
    }
  }

  async getAttendance(req, res, next) {
    try {
      const query = req.query
      const attendance = await attendeeService.getAttendance(query)
      return res.send(attendance)
    } catch (error) {
      next(error)
    }
  }

  async getEventAttendance(req, res, next) {
    try {
      req.body.eventId = req.params.eventId
      req.body.creatorId = req.userInfo.id
      const attendance = await attendeeService.getAttendance({ eventId: req.body.eventId })
      return res.send(attendance)
    } catch (error) {
      next(error)
    }
  }

  async removeAttendee(req, res, next) {
    try {
      const userId = req.userInfo.id
      const attendeeId = req.params.attendeeId
      await attendeeService.removeAttendee(attendeeId, userId)
      res.send('Attendee has been removed')
    } catch (error) {
      next(error)
    }
  }
}
