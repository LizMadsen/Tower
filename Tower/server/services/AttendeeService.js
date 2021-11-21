import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { towerEventService } from './TowerEventService'

class AttendeeService {
  async attendEvent(body) {
    const towerEvent = await towerEventService.getEventById(body.eventId)
    const found = await dbContext.Attendee.findOne({ eventId: body.eventId, accountId: body.accountId })
    if (found) {
      throw new BadRequest('You are attending this event!')
    }
    const attending = await dbContext.Attendee.create(body)
    await attending.populate('account event')
    towerEvent.capacity--
    return attending
  }

  async getAttendeesById(id) {
    const attendee = await dbContext.Attendee.findById(id).populate('creator')
    if (!attendee) {
      throw new BadRequest('ID invalid')
    }
    return attendee
  }

  async removeAttendee(attendeeId, userId) {
    const attendee = await this.getAttendeesById(attendeeId)
    if (attendee.creatorId.toString() !== userId) {
      throw new Forbidden('Sorry, you cannot do that!')
    }
    await dbContext.Attendee.findByIdAndDelete(attendeeId)
  }

  async getAttendance(query = {}) {
    const myAttendance = await dbContext.TowerEvent.find(query).populate('account', 'name picture')
    if (!myAttendance) {
      throw new BadRequest('ID invalid')
    }
    return myAttendance
  }
}

export const attendeeService = new AttendeeService()
