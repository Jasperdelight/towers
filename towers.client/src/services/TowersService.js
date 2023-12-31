import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { Tower } from "../models/Tower.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TowersService {
  async getTowers() {
    const res = await api.get('api/events')
    // logger.log('got events', res.data)
    const towers = res.data.map(t => new Tower(t))
    AppState.towers = towers
  }

  async getTowerById(towerId) {
    const res = await api.get(`api/events/${towerId}`)
    logger.log('got event', res.data)
    const tower = new Tower(res.data)
    AppState.activeTower = tower
  }

  async createTower(towerData) {
    const res = await api.post(`api/events`, towerData)
    logger.log('new event', res.data)
    const tower = new Tower(res.data)
    return tower
  }

  async archiveTower(towerId) {
    const res = await api.delete(`api/events/${towerId}`)
    logger.log('tower canceled', res.data)
  }

}
export const towersService = new TowersService()