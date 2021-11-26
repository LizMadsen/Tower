import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
import { logger } from '../utils/Logger'

class TowerEventService {
  async createEvent(body) {
    const newEvent = await dbContext.TowerEvent.create(body)
    await newEvent.populate('creator')
    return newEvent
  }

  async attendEvent(body) {
    const newAttendee = await dbContext.Attendee.create(body)
    await newAttendee.populate('creator')
    return newAttendee
  }

  async getAllEvents(query = {}) {
    return await dbContext.TowerEvent.find(query).populate('creator')
  }

  async getEventById(id) {
    const Event = await dbContext.TowerEvent.findById(id).populate('creator')
    if (!Event) {
      throw new BadRequest('Invalid ID')
    }
    return Event
  }

  async capacityUp(id) {
    const update = await dbContext.TowerEvent.findById(id)
    if (update.capacity <= 0) {
      throw new BadRequest('This event is at capacity')
    }
    update.capacity--
    logger.log(update)
    const updated = await dbContext.TowerEvent.findByIdAndUpdate(id, update, { new: true })
    logger.log(updated)
    return updated
  }

  async capacityDown(id) {
    const update = await dbContext.TowerEvent.findById(id)
    update.capacity++
    const updated = await dbContext.TowerEvent.findByIdAndUpdate(id, update, { new: true })
    return updated
  }

  async editEvent(body) {
    const Event = await this.getEventById({ _id: body.id })
    if (Event.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('You cannot edit this event')
    } else if (Event.isCanceled) {
      throw new BadRequest('This event is canceled')
    }
    const newEvent = dbContext.TowerEvent.findByIdAndUpdate({ _id: body.id, creatorId: body.creatorId }, body, { new: true })
    return newEvent
  }

  async cancelEvent(id, update) {
    const Event = await this.getEventById(id)
    if (Event.creatorId.toString() !== update.creatorId) {
      throw new Forbidden('Nah Bruh!')
    }
    const newEvent = await dbContext.TowerEvent.findByIdAndUpdate(id, update, { new: true })
    return newEvent
  }
}

export const towerEventService = new TowerEventService()
