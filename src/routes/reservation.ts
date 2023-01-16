import { Router, Request, Response } from 'express'
import { createReservation, deleteReservation, getReservation, updateReservation } from '../controllers/reservationController'

const reservationRouter = Router()

reservationRouter.post('/create', (req: Request, res: Response) => {
  if (req.isAuthenticated != null) {
    createReservation(req, res)
      .then(() => {})
      .catch(() => {})
  } else {
    res.status(401).json({
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
    res.status(401).json({
      error: 'You need to login'
    })
  }
})

reservationRouter.delete('/:id', (req: Request, res: Response) => {
  if (req.isAuthenticated != null) {
    deleteReservation(req, res)
      .then(() => {})
      .catch(() => {})
  } else {
    res.status(401).json({
      error: 'You need to login'
    })
  }
})

reservationRouter.put('/:id', (req: Request, res: Response) => {
  updateReservation(req, res)
    .then(() => {})
    .catch(() => {})
})

export { reservationRouter }
