import { Auth0Provider } from '@bcwdev/auth0provider'
import { commentService } from '../services/CommentService'
import BaseController from '../utils/BaseController'

export class CommentsController extends BaseController {
  constructor() {
    super('/api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.removeComment)
  }

  async createComment(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const comment = await commentService.createComment(req.body)
      res.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async removeComment(req, res, next) {
    try {
      const userId = req.userInfo.id
      const commentId = req.params.commentId
      await commentService.removeComment(commentId, userId)
      res.send('This comment has been removed')
    } catch (error) {
      next(error)
    }
  }
}
