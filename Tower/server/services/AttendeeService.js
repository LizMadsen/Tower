import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class AttendeeService {
  async attendEvent(body) {
    const attend = await dbContext.Attendee.create(body)
    await attend.populate('account event')
    return attend
  }

  async getEventAttendance(query = {}) {
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

  async unattend(attendeeId, userId) {
    const found = await dbContext.Attendee.findById(attendeeId)
    if (found.accountId.toString() !== userId) {
      throw new Forbidden('invalid entry')
    }
    await dbContext.Attendee.findByIdAndDelete(attendeeId)
  }

  async getMyAttendance(query = {}) {
    const myAttendance = await dbContext.Attendee.find(query).populate('event', 'name picture')

    return myAttendance
  }
}

export const attendeeService = new AttendeeService()
