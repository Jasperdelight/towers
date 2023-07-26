import { Auth0Provider } from "@bcwdev/auth0provider";
import { towersService } from "../services/TowersService.js";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

export class TowersController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getTowers)
      .get('/:eventId', this.getTowerById)
      .get('/:eventId/tickets', this.getTicketsByTowerId)
      .get('/:eventId/comments', this.getCommentsByEventId)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTower)
      .put('/:eventId', this.editTower)
      .delete('/:eventId', this.cancelTower)
  }


  async getTowers(req, res, next) {
    try {
      const towers = await towersService.getTowers()
      return res.send(towers)
    } catch (error) {
      next(error);
    }
  }

  async getTowerById(req, res, next) {
    try {
      const towerId = req.params.eventId
      const tower = await towersService.getTowerById(towerId)
      return res.send(tower)
    } catch (error) {
      next(error);
    }
  }
  async getTicketsByTowerId(req, res, next) {
    try {
      const towerId = req.params.eventId
      const tickets = await ticketsService.getTicketsByTowerId(towerId)
      return res.send(tickets)
    } catch (error) {
      next(error);
    }
  }
  async getCommentsByEventId(req, res, next) {
    try {
      const eventId = req.params.eventId
      const comments = await commentsService.getCommentsByEventId(eventId)
      return res.send(comments)
    } catch (error) {
      next(error);
    }
  }
  async createTower(req, res, next) {
    try {
      const towerData = req.body
      towerData.creatorId = req.userInfo.id
      const newTower = await towersService.createTower(towerData)
      return res.send(newTower)
    } catch (error) {
      next(error);
    }
  }

  async editTower(req, res, next) {
    try {
      const towerId = req.params.eventId
      const userId = req.userInfo.id
      const towerData = req.body
      const newTower = await towersService.editTower(towerId, userId, towerData)
      return res.send(newTower)
    } catch (error) {
      next(error);
    }
  }
  async cancelTower(req, res, next) {
    try {
      const towerId = req.params.eventId
      const userId = req.userInfo.id
      const tower = await towersService.cancelTower(towerId, userId)
      return res.send(tower)
    } catch (error) {
      next(error);
    }
  }
}