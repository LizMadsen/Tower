import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeeService } from '../services/AttendeeService'
import BaseController from '../utils/BaseController'
import { logger } from '../utils/Logger'

export class AttendeeController extends BaseController {
  constructor() {
    super('/api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attendEvent)
      .delete('/:attendeeId', this.removeAttendee)
  }

  async attendEvent(req, res, next) {
    try {
      // req.body.accountId = req.userInfo.id
      // req.body.eventId = req.body.id
      logger.log(req.body)
      const attended = await attendeeService.attendEvent(req.body)
      return res.send(attended)
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
