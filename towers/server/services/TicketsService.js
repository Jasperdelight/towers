import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TicketsService {
  async deleteTicket(ticketId, userId) {
    const ticketRemove = await dbContext.Tickets.findById(ticketId)
    if (!ticketRemove) {
      throw new BadRequest('no ticket with that ID exists')
    }
    if (ticketRemove.accountId != userId) {
      throw new Forbidden('You cannot delete a ticket that is not yours')
    }
    await ticketRemove.remove()
    return ticketRemove
  }


  async createTicket(ticketData) {
    const newTicket = await dbContext.Tickets.create(ticketData)
    await newTicket.populate('profile', 'name picture')
    await newTicket.populate('event')

    return newTicket
  }

  async getTicketsByAccount(accountId) {
    const accountTickets = await dbContext.Tickets.find({ accountId })
      .populate({
        path: 'event',
        populate: {
          path: 'creator ticketCount'
        }
      })
    return accountTickets
  }
  async getTicketsByTowerId(eventId) {
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile', 'name picture')
    return tickets
  }

}
export const ticketsService = new TicketsService()