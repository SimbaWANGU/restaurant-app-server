import { Router, Request, Response } from 'express'
import { createFeedback, getFeedback } from '../controllers/feedbackController'

const feedbackRouter = Router()

feedbackRouter.post('/create', (req: Request, res: Response) => {
  if (req.isAuthenticated != null) {
    createFeedback(req, res)
      .then(() => {})
      .catch(() => {})
  } else {
    res.status(401).json({
      error: 'You need to login'
    })
  }
})

feedbackRouter.get('/', (req: Request, res: Response) => {
  getFeedback(req, res)
    .then(() => {})
    .catch(() => {})
})

export { feedbackRouter }
