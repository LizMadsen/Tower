import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'
import { towerEventService } from './TowerEventService'

class AttendeeService {
  async attendEvent(body) {
    const attend = await dbContext.Attendee.create(body)
    await attend.populate('account event')
    logger.log('capacity up')
    await towerEventService.capacityUp(body.eventId)
    return attend
  }

  async unattendEvent(attendeeRecordId, userId) {
    const found = await dbContext.Attendee.findById(attendeeRecordId)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('invalid entry')
    }
    await towerEventService.capacityDown(found.eventId)
    await dbContext.Attendee.findByIdAndDelete(attendeeRecordId)
  }

  async getEventAttendance(query = {}) {
    const events = await dbContext.Attendee.find(query)
      .populate('account event')
    return events
  }

  async getAccountAttendance(query = {}) {
    const events = await dbContext.Attendee.find(query)
      .populate('account event')
    return events
  }

  async getAllAttendees(query = {}) {
    logger.log('test')
    return await dbContext.Attendee.find(query)
  }

  async getAttendeesById(id) {
    const attendee = await dbContext.Attendee.findById(id).populate('creator')
    if (!attendee) {
      throw new BadRequest('Invalid id ')
    }
    return attendee
  }

  async getMyAttendance(query = {}) {
    const myAttendance = await dbContext.Attendee.find(query).populate('event', 'name picture')

    return myAttendance
  }
}

export const attendeeService = new AttendeeService()
