import { Request, Response } from 'express'
import { ReservationModel } from '../models/Reservation'

interface Reservation {
  username: String
  date: String
  time: String
  guests: Number
  completed: Boolean
}

const createReservation = (req: Request, res: Response): void => {
  if (req.body.username === null || req.body.date === null || req.body.time === null || req.body.guests === null || req.body.completed === null) {
    res.json({
      error: 'Incomplete Reservation'
    })
  } else {
    ReservationModel.create({
      username: req.body.username,
      date: req.body.date,
      time: req.body.time,
      guests: req.body.guests,
      completed: false
    })
      .then((savedObject: Reservation) => {
        console.log(savedObject)
        res.json({
          success: 'Resevation has been created'
        })
      })
      .catch((error: Error) => {
        console.log(error)
        res.json({
          error: error.toString()
        })
      })
  }
}

const getReservation = async (req: Request, res: Response): Promise<void> => {
  if (req.params.username === null) {
    res.json({
      error: 'User does not exist'
    })
  } else {
    console.log(req.params.username)
    const myReservations = await ReservationModel.find({
      username: req.params.username
    })
    res.json({
      myReservations
    })
  }
}

export { createReservation, getReservation }
