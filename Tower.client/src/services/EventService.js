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
    logger.log(res.data)
    AppState.activeEvent = res.data
  }

}

export const eventService = new EventService()