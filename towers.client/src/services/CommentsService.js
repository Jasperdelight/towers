import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async getCommentsByTowerId(towerId) {
    const res = await api.get(`api/events/${towerId}/comments`)
    logger.log('got comments', res.data)
    AppState.comments = res.data.map(c => new Comment(c))
  }

  async createComment(commentData) {
    const res = await api.post('api/comments', commentData)
    logger.log('created comment', res.data)
    const newComment = new Comment(res.data)
    AppState.comments.unshift(newComment)
  }
  async deleteComment(commentToDeleteId) {
    const res = await api.delete(`api/comments/${commentToDeleteId}`)
    logger.log('comment deleted', res.data)
    AppState.comments = AppState.comments.filter(c => c.id !== commentToDeleteId)
  }

}
export const commentsService = new CommentsService()