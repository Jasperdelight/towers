import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towersService } from "./TowersService.js"

class CommentsService {

  async getCommentsByEventId(eventId) {
    const comments = await dbContext.Comments.find({ eventId }).populate('creator', 'name picture')
    return comments
  }
  async createComment(commentData) {
    const tower = await towersService.getTowerById(commentData.eventId)
    if (tower.isCanceled == true) {
      throw new Forbidden('event is canceled, no more comments >:c')
    }
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator', 'name picture')
    return comment
  }
  async deleteComment(commentId, userId) {
    const commentCreator = await dbContext.Comments.findById(commentId)
    if (commentCreator.creatorId.toString() != userId) {
      throw new Forbidden('You can not delete this comment')
    }
    await commentCreator.remove()
  }
}

export const commentsService = new CommentsService()
