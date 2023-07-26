import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async getTicketsByTowerId(towerId) {
    const res = await api.get(`api/events/${towerId}/tickets`)
    // logger.log('getting tickets', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }
  async attendTower(profileData) {
    const res = await api.post('api/tickets', profileData)
    logger.log('attending?', res.data)
    const newTicket = new Ticket(res.data)
    AppState.tickets.unshift(newTicket)

  }
  async unAttendTower(profileId) {
    const res = await api.delete(`api/tickets/${profileId}`)
    logger.log('removing ticket', res.data)
    AppState.tickets = AppState.tickets.filter(t => t.id != profileId)
  }
}
export const ticketsService = new TicketsService()