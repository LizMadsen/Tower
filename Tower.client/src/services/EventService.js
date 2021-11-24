import { AppState } from "../AppState"
import { router } from "../router"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class EventService{
  async getAllEvents(){
    const res = await api.get('api/events')
    logger.log(res.data)
    AppState.events = res.data
  }
  async getActiveEvent(id){
   const res = await api.get(`api/events/${id}`)
    AppState.activeEvent = res.data
  }

  async createEvent(event){
    const res = await api.post('api/events/', event)
    // logger.log(res.data)
    AppState.activeEvent = res.data
  }

  async editEvent(id, event){
    const res = await api.put(`api/events/${id}`, event)
    AppState.activeEvent = res.data
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
    logger.log(res.data)
    AppState.attendees = res.data
  }

  async removeComment(id){
    const res = await api.delete(`api/comments/${id}`)
    AppState.comments = AppState.comments.filter(c=>c.id != id)
  }

}

export const eventService = new EventService()