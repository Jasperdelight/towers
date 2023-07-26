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
}
export const ticketsService = new TicketsService()