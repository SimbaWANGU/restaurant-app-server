import { Router, Request, Response } from 'express'
import { createReservation, getReservation } from '../controllers/reservationController'

const reservationRouter = Router()

reservationRouter.post('/create', (req: Request, res: Response) => {
  if (req.isAuthenticated != null) {
    createReservation(req, res)
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

reservationRouter.get('/:username', (req: Request, res: Response) => {
  if (req.isAuthenticated != null) {
    getReservation(req, res)
      .then(() => {})
      .catch(() => {})
  } else {
    res.json({
      error: 'You need to login'
    })
  }
})

export { reservationRouter }
