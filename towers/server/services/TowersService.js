import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class TowersService {



  async getTowers() {
    const towers = await dbContext.Towers.find()
      .populate('creator', 'name picture')
      .populate('ticketCount')
    return towers
  }

  async getTowerById(towerId) {
    const tower = (await (await dbContext.Towers.findById(towerId)).populate('creator', 'name picture')).populate('ticketCount')
    if (!tower) {
      throw new BadRequest('event does not exist')
    }
    return tower
  }
  async createTower(towerData) {
    const newTower = await dbContext.Towers.create(towerData)
    await newTower.populate('creator', 'name picture')
    await newTower.populate('ticketCount')
    return newTower
  }

  async editTower(towerId, userId, towerData) {
    const towerToBeEdited = await this.getTowerById(towerId)
    if (towerToBeEdited.creatorId.toString() != userId) {
      throw new Forbidden('You are not the owner of this tower!')
    }
    if (towerToBeEdited.isCanceled == true) {
      throw new Error('Event is cancelled')
    }
    // await towerToBeEdited.delete()
    // const editedTower = await dbContext.Towers.create(towerData)

    towerToBeEdited.name = towerData.name || towerToBeEdited.name
    towerToBeEdited.description = towerData.description || towerToBeEdited.description
    towerToBeEdited.coverImg = towerData.coverImg || towerToBeEdited.coverImg
    towerToBeEdited.location = towerData.location || towerToBeEdited.location
    towerToBeEdited.capacity = towerData.capacity || towerToBeEdited.capacity
    towerToBeEdited.startDate = towerData.startDate || towerToBeEdited.startDate
    towerToBeEdited.type = towerData.type || towerToBeEdited.type
    await towerToBeEdited.save()
    return towerToBeEdited
  }

  async cancelTower(towerId, userId) {
    const towerToCancel = await this.getTowerById(towerId)
    if (towerToCancel.creatorId.toString() != userId) {
      throw new Forbidden('You are not the creator of this event.')
    }
    towerToCancel.isCanceled = true
    await towerToCancel.save()
    return towerToCancel
  }

}
export const towersService = new TowersService()