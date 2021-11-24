import { Auth0Provider } from '@bcwdev/auth0provider'
import { towerEventService } from '../services/TowerEventService'
import BaseController from '../utils/BaseController'
import { attendeeService } from '../services/AttendeeService'
import { commentService } from '../services/CommentService'
import { logger } from '../utils/Logger'

export class TowerEventController extends BaseController {
  constructor() {
    super('/api/events')
    this.router
      .get('', this.getAllEvents)
      .get('/:eventId', this.getEventById)
      .get('/:eventId/comments', this.getCommentsByEvent)
      .get('/:eventId/attendees', this.getAttendeesByEvent)
      .get('/:accountId/events', this.getEventsByAccountId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createEvent)
      .put('/:eventId', this.editEvent)
      .delete('/:eventId', this.cancelEvent)
  }

  async createEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const Event = await towerEventService.createEvent(req.body)
      res.send(Event)
    } catch (error) {
      next(error)
    }
  }

  async getCommentsByEvent(req, res, next) {
    try {
      const comment = await commentService.getCommentsByEvent(req.params.eventId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async getAttendeesByEvent(req, res, next) {
    try {
      const events = await attendeeService.getEventAttendance({ eventId: req.params.eventId })
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getEventsByAccountId(req, res, next) {
    try {
      const events = await attendeeService.getEventAttendance({ accountId: req.params.accountId })
      return res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next) {
    try {
      const query = req.query
      const Events = await towerEventService.getAllEvents(query)
      res.send(Events)
    } catch (error) {
      next(error)
    }
  }

  async getEventById(req, res, next) {
    try {
      const Event = await towerEventService.getEventById(req.params.eventId)
      return res.send(Event)
    } catch (error) {
      next(error)
    }
  }

  async editEvent(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.eventId
      delete req.body.isCanceled
      const newEvent = await towerEventService.editEvent(req.body)
      return res.send(newEvent)
    } catch (error) {
      next(error)
    }
  }

  async cancelEvent(req, res, next) {
    try {
      const creatorId = req.userInfo.id
      const id = req.params.eventId

      const canceledEvent = await towerEventService.cancelEvent(id, { isCanceled: true, creatorId: creatorId })
      return res.send(canceledEvent)
    } catch (error) {
      next(error)
    }
  }
}
