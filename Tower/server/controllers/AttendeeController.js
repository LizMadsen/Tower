import { Auth0Provider } from '@bcwdev/auth0provider'
import { attendeeService } from '../services/AttendeeService'
import BaseController from '../utils/BaseController'

export class AttendeeController extends BaseController {
  constructor() {
    super('/api/attendees')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.attendEvent)
      .delete('/:attendeeId', this.unattendEvent)
  }

  async attendEvent(req, res, next) {
    try {
      const attended = await attendeeService.attendEvent(req.body)
      return res.send(attended)
    } catch (error) {
      next(error)
    }
  }

  async unattendEvent(req, res, next) {
    try {
      const userId = req.userInfo.id
      const attendeeRecordId = req.params.attendeeId
      await attendeeService.unattendEvent(attendeeRecordId, userId)
      res.send('Attendee has been removed')
    } catch (error) {
      next(error)
    }
  }
}
