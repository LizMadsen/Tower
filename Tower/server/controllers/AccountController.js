import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { attendeeService } from '../services/AttendeeService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('/account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/:accountId/attendees', this.getAccountAttendees)
      .put('', this.edit)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const account = await accountService.updateAccount(req.userInfo, req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getAccountAttendees(req, res, next) {
    try {
      const attendees = await attendeeService.getEventAttendance({ accountId: req.params.accountId })
      res.send(attendees)
    } catch (error) {
      next(error)
    }
  }
}
