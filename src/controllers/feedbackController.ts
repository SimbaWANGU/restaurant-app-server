import { Request, Response } from 'express'
import { FeedbackModel } from '../models/Feedback'

const createFeedback = async (req: Request, res: Response): Promise<void> => {
  if (req.body.username === null || req.body.emoji === null || req.body.feedback === null) {
    res.status(400).json({
      error: 'Incomplete Reservation'
    })
  } else {
    await FeedbackModel.create({
      username: req.body.username,
      emoji: req.body.emoji,
      feedback: req.body.feedback
    })
      .then(() => {
        res.status(200).json({
          success: 'Feedback has been created'
        })
      })
      .catch(() => {
        res.status(500).json({
          error: 'An error occurred'
        })
      })
  }
}

const getFeedback = async (req: Request, res: Response): Promise<void> => {
  const feedbacks = await FeedbackModel.find()
  res.status(200).json({
    feedbacks
  })
}

export { createFeedback, getFeedback }
