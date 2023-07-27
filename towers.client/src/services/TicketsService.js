import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class TicketsService {
  async getTicketsByTowerId(towerId) {
    const res = await api.get(`api/events/${towerId}/tickets`)
    // logger.log('getting tickets', res.data)
    AppState.tickets = res.data.map(t => new Ticket(t))
  }
  async attendTower(profileData) {
    const res = await api.post('api/tickets', profileData)
    // logger.log('attending?', res.data)
    const newTicket = new Ticket(res.data)
    AppState.tickets.unshift(newTicket)
    AppState.myTickets.unshift(newTicket)
    // logger.log('all my tickets', AppState.myTickets)

  }
  async unAttendTower(profileId) {
    const res = await api.delete(`api/tickets/${profileId}`)
    logger.log('removing ticket', res.data)
    AppState.tickets = AppState.tickets.filter(t => t.id != profileId)
    AppState.myTickets = AppState.myTickets.filter(t => t.id != profileId)
  }

  async getMyTickets() {
    try {
      const res = await api.get('account/tickets')
      // logger.log('getting my tickets', res.data)
      AppState.myTickets = res.data.map(t => new Ticket(t))
    } catch (error) {
      Pop.error(error.message);
      logger.log(error);
    }
  }

}
export const ticketsService = new TicketsService()