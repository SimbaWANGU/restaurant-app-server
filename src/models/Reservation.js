"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationModel = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const mongoose = require('mongoose');
const ReservationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});
const ReservationModel = mongoose.model('Reservation', ReservationSchema);
exports.ReservationModel = ReservationModel;
