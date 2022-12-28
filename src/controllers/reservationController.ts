import { Request, Response } from 'express'
import { ReservationModel } from '../models/Reservation'

const createReservation = async (req: Request, res: Response): Promise<void> => {
  if (req.body.username === null || req.body.date === null || req.body.time === null || req.body.guests === null) {
    res.json({
      error: 'Incomplete Reservation'
    })
  } else {
    await ReservationModel.create({
      username: req.body.username,
      date: req.body.date,
      time: req.body.time,
      guests: req.body.guests,
      completed: false
    })
      .then(() => {
        res.json({
          success: 'Resevation has been created'
        })
      })
      .catch(() => {
        res.json({
          error: 'An error occurred'
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
    const myReservations = await ReservationModel.find({
      username: req.params.username
    })
    res.json({
      myReservations
    })
  }
}

const deleteReservation = async (req: Request, res: Response): Promise<void> => {
  if (req.params.id === null) {
    res.json({
      error: 'Reservation does not exist'
    })
  } else {
    ReservationModel.findByIdAndDelete(req.params.id)
      .then(() => {
        res.json({
          deleted: 'The reservation has been cancelled'
        })
      })
      .catch(() => {
        res.json({
          error: 'An error occurred'
        })
      })
  }
}

const updateReservation = async (req: Request, res: Response): Promise<void> => {
  if (req.body.username === null || req.body.date === null || req.body.time === null || req.body.guests === null || req.body.completed === null || req.params.id === null) {
    res.json({
      error: 'Incomplete Reservation'
    })
  } else {
    await ReservationModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        username: req.body.username,
        date: req.body.date,
        time: req.body.time,
        guests: req.body.guests,
        completed: false
      },
      { new: true }
    )
      .then(() => {
        res.json({
          updated: 'Reservation has been updated'
        })
      })
      .catch(() => {
        res.json({
          error: 'An error occurred while updating the Reservation'
        })
      })
  }
}

export { createReservation, getReservation, deleteReservation, updateReservation }
