"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservation = exports.createReservation = void 0;
const Reservation_1 = require("../models/Reservation");
const createReservation = (req, res) => {
    if (req.body.username === null || req.body.date === null || req.body.time === null || req.body.guests === null || req.body.completed === null) {
        res.json({
            error: 'Incomplete Reservation'
        });
    }
    else {
        Reservation_1.ReservationModel.create({
            username: req.body.username,
            date: req.body.date,
            time: req.body.time,
            guests: req.body.guests,
            completed: false
        })
            .then((savedObject) => {
            console.log(savedObject);
            res.json({
                success: 'Resevation has been created'
            });
        })
            .catch((error) => {
            console.log(error);
            res.json({
                error: error.toString()
            });
        });
    }
};
exports.createReservation = createReservation;
const getReservation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.params.username === null) {
        res.json({
            error: 'User does not exist'
        });
    }
    else {
        console.log(req.params.username);
        const myReservations = yield Reservation_1.ReservationModel.find({
            username: req.params.username
        });
        res.json({
            myReservations
        });
    }
});
exports.getReservation = getReservation;
