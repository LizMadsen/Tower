import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventService{
  async getAllEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data
  }

    async getActiveEvent(id){
   const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data
  }

  async createEvent(event){
    const res = await api.post('api/events/', event)
    AppState.activeEvent = res.data
  }

  async editEvent(id, event){
    const res = await api.put(`api/events/${id}`, event)
    AppState.activeEvent = res.data
  }

  async cancelEvent(id){
    const res = await api.delete(`api/events/${id}`)
    AppState.activeEvent = res.data
  }

  async attendEvent(attendee){
    const res = await api.post('api/attendees', attendee)
    AppState.attendees.push(res.data)
  }

  async unattendEvent(attendee){
    const attendeeRecord = AppState.attendees.find(a=> a.eventId == attendee.eventId && a.accountId == attendee.accountId)
    const res = await api.delete(`api/attendees/${attendeeRecord.id}`)
    AppState.attendees = AppState.attendees.filter(a=>a.id != attendeeRecord.id)
  }

  async createComment(comment){
    const res = await api.post('api/comments/', comment)
    AppState.comments.push(res.data)
  }

  async getCommentsByEvent(id){
    const res = await api.get(`api/events/${id}/comments`)
    AppState.comments = res.data
  }

  async getAttendeesByEvent(id){
    const res = await api.get(`api/events/${id}/attendees`)
    AppState.attendees = res.data
  }

  async removeComment(id){
    const res = await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c=>c.id != id)
  }

}

export const eventService = new EventService()